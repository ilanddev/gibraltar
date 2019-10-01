import * as paper from 'paper';
import { LIGHT_GREY, VAPP_BACKGROUND_COLOR } from '../constants/colors';
import { DEFAULT_SCROLLBAR_THICKNESS } from '../constants/dimensions';

const MINIMUM_SCROLLBAR_LENGTH = 20;
const DEFAULT_SCROLLBAR_COLOR = LIGHT_GREY;
const DEFAULT_TRACK_COLOR = VAPP_BACKGROUND_COLOR;
const NORMAL_SCROLLBAR_OPACITY = 0.75;
const ACTIVE_SCROLLBAR_OPACITY = 1;
const HIT_TEST_TOLERANCE = 11;
const DEFAULT_SCROLLABLE_OFFSET = 0;

/**
 * Enumeration of scrollbar directions.
 */
type ScrollbarDirection = 'horizontal' | 'vertical';

/**
 * Interface for scrollable content.
 */
interface Scrollable {
  /**
   * @property content The content that will be scrolled.
   */
  content: paper.Group | paper.Item;
  /**
   * @property container The container that displays the viewable content. Could be something like the view or a
   * clip mask. Used for hover event listening. HTMLCanvasElement used to solve issues with multiple paper views.
   */
  container: paper.Group | paper.Item | paper.View | HTMLCanvasElement;
  /**
   * @property containerBounds Bounds of the container that displays the viewable content. Used for measurements.
   */
  containerBounds: paper.Rectangle;
  /**
   * @property contentOffsetStart Offset content at the start - left for horizontal scrollbars and top for vertical.
   * Content won't move to the offset until scrolling occurs. Recommended to place content in desired starting position
   * (which is automatically included) and NOT use this. Default is 0.
   */
  contentOffsetStart?: number;
  /**
   * @property contentOffsetEnd Offset content at the end - right for horizontal scrollbars and bottom for vertical.
   * Good for adding extra padding/margin to the content at the end position within the container. Default is 0.
   */
  contentOffsetEnd?: number;
  /**
   * @property Used to check if scrollbar is needed. Check if content including any offset values fits inside the
   * container bounds when true. Checks only the content without offsets when false. Default is true.
   */
  checkFitWithOffsets?: boolean;
}

/**
 * Interface for additional custom effects that can be set externally for each state.
 */
class CustomEffects {
  setActive?: () => void;
  setNormal?: () => void;
}

/**
 * Scrollbar Visual Component.
 */
export class ScrollbarComponent extends paper.Group {

  // checks if any scrollbars are currently receiving mouse drag input to override other default events
  static anyIsDragging: boolean = false;
  // the default scrollbar that can still receive input events while a scrollbar of another direction is active. For
  // example, the main view's horizontal scrollbar can scroll from horizontal input events even if a vapp vertical
  // scrollbar is active.
  static _defaultScrollbar: ScrollbarComponent | undefined;
  static defaultScrollbarDirection: ScrollbarDirection | undefined;
  protected scrollbar: paper.Path;
  protected track: paper.Path;
  protected scrollAmount: number;
  protected customEffects: CustomEffects = {};
  protected enableDefaultEffects: boolean = true;
  private isHorizontal: boolean;
  // relevant axis based on scrollbar's direction used for positioning and measuring. either 'x' or 'y'
  private axis: (keyof paper.Point);
  // relevant dimension based on scrollbar's direction used for positioning and measuring. either 'width' or 'height'
  private dimension: (keyof paper.Rectangle);
  // content's original position. used to constrain content position while scrolling
  private contentInitialPosition: number;
  // scrollbar is visible and interactive when container is hovered
  private enabled: boolean = true;
  private containerSize: number;
  // make a bigger area to make the track easier to interact with
  private extendedTrackArea: paper.Path.Rectangle;
  // make a bigger area to make the scrollbar easier to interact with
  private extendedScrollbarArea: paper.Path.Rectangle;
  private arrowKeyDown: paper.Tool;
  private scrollbarDrag: paper.Tool;
  private dragging: boolean = false;
  private scrollbarHovering: boolean = false;
  private containerHovering: boolean = false;
  private activeScrollTimeout: ReturnType<typeof setTimeout>;

  /**
   * Creates a new ScrollbarComponent instance.
   *
   * @param scrollable The scrollable content data.
   * @param _point The point that the scrollbar will be rendered at. Default is (0, 0).
   * @param direction The direction of the scrollbar. Either 'vertical' or 'horizontal.' Default is 'horizontal.'
   * @param scrollTrackLength Length of the scrollbar track / path. If kept at 0, it will default to a length of the
   * container.
   *
   * @example
   * // Create a horizontal scrollbar with mostly default configuration.
   * const scrollable = {
   *   content: (your content),
   *   container: (content's container),
   *   containerBounds: (content's container.bounds)
   * }
   * const scrollbar = new ScrollbarComponent(scrollable, new paper.Point(30, 30));
   *
   * @example
   * // Create a vertical scrollbar with more configuration.
   * const containerPadding = 20;
   * const scrollable = {
   *   content: (your content),
   *   container: (content's container),
   *   containerBounds: (content's container.bounds),
   *   contentOffsetEnd: containerPadding
   * };
   * const scrollbar = new ScrollbarComponent(
   *  scrollable,
   *  new paper.Point(containerPadding, containerPadding),
   *  container.bounds.height - (containerPadding * 2),
   *  'vertical'
   * );
   */
  constructor(readonly scrollable: Scrollable,
              private _point: paper.Point = new paper.Point(0, 0),
              readonly scrollTrackLength: number = 0,
              private direction: ScrollbarDirection = 'horizontal') {
    super();
    this.position = this._point as paper.Point;
    this.pivot = new paper.Point(0, 0);

    this.isHorizontal = this.direction === 'horizontal';
    this.axis = this.isHorizontal ? 'x' : 'y';
    this.dimension = this.isHorizontal ? 'width' : 'height';
    this.scrollable = this.assignScrollableDefaults();

    this.scrollTrackLength = this.scrollTrackLength === 0
      ? this.scrollable.containerBounds[this.dimension]
      : this.scrollTrackLength;
    this.contentInitialPosition = this.scrollable.content.position[this.axis] as number;
    this.containerSize = this.scrollable.containerBounds[this.dimension];

    this.track = this.createTrack(this.scrollTrackLength, DEFAULT_SCROLLBAR_THICKNESS);
    this.scrollbar = this.createScrollbar(this.getProportionalLength(), DEFAULT_SCROLLBAR_THICKNESS);
    // extend track and scrollbar hit areas based on hit tolerance to make interaction easier. used for onClick
    // event and hover tests
    this.extendedTrackArea = this.extendHitArea(this.track);
    this.extendedScrollbarArea = this.extendHitArea(this.scrollbar);
    // check if scrollbar is necessary
    if (this.scrollableContentFitsContainer()) {
      this.disable();
      return;
    }

    // cursor effects
    this.onMouseEnter = this.mouseEnter;
    this.onMouseLeave = this.mouseLeave;
    // event handlers
    this.onMouseMove = this.scrollbarHover;
    this.onClick = this.trackClick;
    this.scrollbarDrag = this.scrollbarDragTool();
    this.arrowKeyDown = this.arrowKeyDownTool();

    // not visible until container is hovered and no other scrollbars are currently in dragging state
    this.visible = false;
    // handles hover events for html canvas and paper items
    if (this.scrollable.container instanceof HTMLCanvasElement) {
      this.scrollable.container.onmouseenter = () => this.containerMouseEnter();
      this.scrollable.container.onmouseleave = () => this.containerMouseLeave();
    } else {
      this.scrollable.container.onMouseEnter = this.containerMouseEnter;
      this.scrollable.container.onMouseLeave = this.containerMouseLeave;
    }
  }

  /**
   * Sets the default scrollbar.
   * @param value The scrollbar that will be set as default.
   */
  static set defaultScrollbar(value: ScrollbarComponent) {
    this._defaultScrollbar = value;
    this.defaultScrollbarDirection = this._defaultScrollbar.isHorizontal ? 'horizontal' : 'vertical';
  }

  /**
   * Handler for container mouse enter event.
   */
  containerMouseEnter = (): void => {
    this.containerHovering = true;
    if (!ScrollbarComponent.anyIsDragging) {
      this.enabled = true;
      this.visible = true;
      this.activateDefaultTool();
      // handle scroll listening from the HTML canvas element. paper doesn't have a scroll event handler
      this.project.view.element.onwheel = (event: WheelEvent) => {
        this.onScroll(event);
      };
    }
  }

  /**
   * Handler for container mouse leave event.
   */
  containerMouseLeave = (): void => {
    this.containerHovering = false;
    if (!ScrollbarComponent.anyIsDragging) {
      this.enabled = false;
      this.visible = false;
      if (ScrollbarComponent._defaultScrollbar) {
        this.resetDefaultTool();
        // reset default scroll listening from the HTML canvas element. paper doesn't have a scroll event handler
        this.project.view.element.onwheel = (event: WheelEvent) => {
          ScrollbarComponent._defaultScrollbar!.onScroll(event);
        };
      }
    }
  }

  /**
   * Activate the default tool. Used when the scrollable container is hovered or active.
   */
  activateDefaultTool(): void {
    if (this.enabled) {
      this.arrowKeyDown.activate();
    }
  }

  /**
   * Handler for the wheel event.
   * @param event PaperJS does not have a scroll event handler, so this is the WheelEvent passed from the HTML canvas.
   */
  onScroll(event: WheelEvent): void {
    if (this.enabled) {
      const scrollDirection = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? 'horizontal' : 'vertical';
      if (scrollDirection === this.direction) {
        event.preventDefault();
        this.setActiveContinuously();
        this.isHorizontal
          ? this.changeScrollAndContentPosition(this.scrollbar.position.x + event.deltaX)
          : this.changeScrollAndContentPosition(this.scrollbar.position.y + event.deltaY);
      } else if (scrollDirection === ScrollbarComponent.defaultScrollbarDirection) {
        ScrollbarComponent._defaultScrollbar!.onScroll(event);
      }
    }
  }

  /**
   * Disable the default effects.
   */
  disableDefaultEffects(): void {
    this.enableDefaultEffects = false;
  }

  /**
   * Set custom active and normal effects from the parent.
   * Use with disableDefaultEffects for fuller control. Effects can target ScrollbarComponent elements or something
   * external.
   * @param customEffects
   *
   * @example
   * const scrollbar = newScrollbarComponent(...);
   * scrollbar.setCustomEffects({
   *   setActive: () => {
   *     scrollbar.getScrollbar().fillColor = 'green';
   *   },
   *   setNormal: () => {
   *     scrollbar.getScrollbar().fillColor = 'red;
   *   }
   * });
   */
  setCustomEffects(customEffects: CustomEffects): void {
    this.customEffects = customEffects;
  }

  /**
   * Gets the scrollbar element.
   */
  getScrollbar(): paper.Path {
    return this.scrollbar;
  }

  /**
   * Set a custom scrollbar.
   * Most attributes can be updated with common paper.Item accessors via getScrollbar(), but something like the radius
   * of a rounded rectangle is difficult to change. To completely customize the scrollbar, create a new one in the
   * parent and use setScrollbar(). This allows the scrollbar to retain all of the applied behaviors.
   *
   * @param customScrollbar
   *
   * @example
   * const scrollbar = new ScrollbarComponent(...);
   * const customScrollbar = new paper.Path.Rectangle({
   *   point: new paper.Point(-6.5, 0),
   *   size: new paper.Size(15, 15),
   *   pivot: new paper.Point(0, 0),
   *   radius: 15 / 2,
   *   fillColor: 'teal'
   * });
   * customScrollbar.remove();
   * scrollbar.setScrollbar(customScrollbar);
   */
  setScrollbar(customScrollbar: paper.Path): void {
    this.scrollbar.copyContent(customScrollbar);
    this.scrollbar.copyAttributes(customScrollbar, true);
    this.extendedScrollbarArea = this.extendHitArea(customScrollbar);
  }

  /**
   * Gets the scrollbar track element.
   * To make the track 'invisible', set fillColor to the same as parent background color. Or, use opacity = 0 instead of
   * visibility = false for hit tests to still register fillColor.
   */
  getTrack(): paper.Path {
    return this.track;
  }

  /**
   * Set a custom track.
   * Most attributes can be updated with common paper.Item accessors via getTrack(). To completely customize the track,
   * create a new one in the parent and use setTrack. This allows the track to retain all of the applied behaviors.
   * Scrolling positions will be off if custom scrollbar length does not match original track length from
   * initialization.
   *
   * @param customTrack the custom track that replaces the original
   *
   * @example:
   * const scrollbar = new ScrollbarComponent(...);
   * // should match original track length from initialization
   * const scrollbarTrackLength = 600;
   * const customTrack = new paper.Path.Rectangle({
   *   point: new paper.Point(0, 0),
   *   size: new paper.Size(2, scrollbarTrackLength),
   *   fillColor: 'gray'
   * });
   * customTrack.remove();
   * scrollbar.setTrack(customTrack);
   */
  setTrack(customTrack: paper.Path): void {
    this.track.copyContent(customTrack);
    this.track.copyAttributes(customTrack, true);
    this.extendedTrackArea = this.extendHitArea(customTrack);
  }

  /**
   * Reset current paper tool to the default scrollbar's default paper tool when another scrollbar is no longer
   * active and hovered.
   */
  private resetDefaultTool() {
    if (ScrollbarComponent._defaultScrollbar) {
      ScrollbarComponent._defaultScrollbar!.activateDefaultTool();
    }
  }

  /**
   * Enable scrollbar component elements and interactivity.
   */
  private enable(): void {
    this.enabled = true;
    this.addChildren([this.track, this.extendedScrollbarArea, this.extendedTrackArea]);
  }

  /**
   * Disable scrollbar component elements and interactivity.
   */
  private disable(): void {
    this.enabled = false;
    this.removeChildren();
  }

  /**
   * Assign scrollable defaults for the optional properties, so that none will be undefined.
   */
  private assignScrollableDefaults(): Scrollable {
    return {
      contentOffsetStart: DEFAULT_SCROLLABLE_OFFSET,
      contentOffsetEnd: DEFAULT_SCROLLABLE_OFFSET,
      checkFitWithOffsets: true,
      ...this.scrollable
    };
  }

  /**
   * Checks if the content fits inside the container. Scrollbar will be disabled if it does.
   */
  private scrollableContentFitsContainer(): boolean {
    const { content, containerBounds, contentOffsetStart, checkFitWithOffsets } = this.scrollable;
    if (!checkFitWithOffsets) {
      return content.isInside(containerBounds);
    }
    const contentWithOffset = new paper.Path.Rectangle({ rectangle: content.bounds });
    if (this.isHorizontal) {
      contentWithOffset.bounds.width = this.contentSizeWithOffsets();
      contentWithOffset.position.x -= contentOffsetStart!;
    } else {
      contentWithOffset.bounds.height = this.contentSizeWithOffsets();
      contentWithOffset.position.y -= contentOffsetStart!;
    }
    return contentWithOffset.isInside(containerBounds);
  }

  /**
   * Returns content size including the scrollable offset values.
   */
  private contentSizeWithOffsets(): number {
    const { content, contentOffsetStart, contentOffsetEnd } = this.scrollable;
    return (this.isHorizontal ? content.bounds.width : content.bounds.height) + contentOffsetStart! + contentOffsetEnd!;
  }

  /**
   * Create the scrollbar track (progress bar).
   * @param width The width of the track. Swapped with height for the vertical direction.
   * @param height The height of the track. Swapped with width for the vertical direction.
   */
  private createTrack(width: number, height: number): paper.Path {
    const trackSize = this.isHorizontal
      ? new paper.Size(width, height)
      : new paper.Size(height, width);
    return new paper.Path.Rectangle({
      point: new paper.Point(0, 0),
      size: trackSize,
      pivot: new paper.Point(0, 0),
      radius: DEFAULT_SCROLLBAR_THICKNESS / 2,
      fillColor: DEFAULT_TRACK_COLOR,
      parent: this
    });
  }

  /**
   * Create the scrollbar (thumb).
   * @param width The width of the scrollbar. Swapped with height for the vertical direction.
   * @param height The height of the scrollbar. Swapped with width for the vertical direction.
   */
  private createScrollbar(width: number, height: number): paper.Path {
    width = Math.max(width, MINIMUM_SCROLLBAR_LENGTH);
    const scrollbarSize = this.isHorizontal
      ? new paper.Size(width, height)
      : new paper.Size(height, width);
    return new paper.Path.Rectangle({
      point: new paper.Point(0, 0),
      pivot: new paper.Point(0, 0),
      size: scrollbarSize,
      radius: DEFAULT_SCROLLBAR_THICKNESS / 2,
      fillColor: DEFAULT_SCROLLBAR_COLOR,
      opacity: NORMAL_SCROLLBAR_OPACITY,
      parent: this
    });
  }

  /**
   * The proportionate length for the scrollbar. Based on viewable content size divided by the full content size.
   */
  private getProportionalLength(): number {
    const fullSize = this.contentSizeWithOffsets() + this.scrollable.contentOffsetEnd!
      - this.scrollable.contentOffsetStart!;
    return this.containerSize / fullSize * this.scrollTrackLength;
  }

  /**
   * Extend the item's interactive area by adding a larger invisible rectangle.
   * Scrollbar design is a bit thin, so extra hit area was added to make interaction more forgiving.
   * A fillColor and 0 opacity are used so events can register.
   * @param extendedItem The item whose area will be extended.
   */
  private extendHitArea(extendedItem: paper.Path | paper.Group): paper.Path.Rectangle {
    return new paper.Path.Rectangle({
      center: extendedItem.bounds.center,
      size: extendedItem.bounds.size.add(this.getHitTolerance(extendedItem) * 2),
      fillColor: 'white',
      opacity: 0,
      parent: this
    });
  }

  /**
   * Calculate how much tolerance needs to be added to an item based on it's smallest side.
   * @param item The item that's measured.
   */
  private getHitTolerance(item: paper.Item | paper.Group): number {
    const smallestSide = Math.min(item.bounds.width, item.bounds.height);
    return Math.max(0, HIT_TEST_TOLERANCE - smallestSide);
  }

  /**
   * Handler for mouse leave event.
   * @param event {paper.MouseEvent}
   */
  private mouseLeave(event: paper.MouseEvent): void {
    this.scrollbarHovering = false;
    if (!this.dragging) {
      this.project.view.element.style.cursor = 'default';
      this.setNormal();
    }
  }

  /**
   * Handler for mouse enter event.
   */
  private mouseEnter(): void {
    this.scrollbarHovering = true;
    if (!this.dragging) {
      this.project.view.element.style.cursor = 'pointer';
    }
  }

  /**
   * Handler for scrollbar hovering.
   * @param event The event whose point will be tested.
   */
  private scrollbarHover(event: paper.MouseEvent | paper.ToolEvent): void {
    const hovering = this.globalToLocal(event.point).isInside(this.extendedScrollbarArea.bounds);
    if (hovering) {
      this.scrollbarDrag.activate();
      this.setActive();
    } else if (!this.dragging) {
      this.activateDefaultTool();
      this.setNormal();
    }
  }

  /**
   * Handler for the track onClick event.
   * @param event The MouseEvent fired on click.
   */
  private trackClick(event: paper.MouseEvent): void {
    if (this.dragging) {
      return;
    }
    this.isHorizontal
      ? this.changeScrollAndContentPosition(this.globalToLocal(event.point).x
        - (this.scrollbar.bounds.width / 2))
      : this.changeScrollAndContentPosition(this.globalToLocal(event.point).y
        - (this.scrollbar.bounds.height / 2));
    this.scrollbarHover(event);
  }

  /**
   * Change the scrollbar and content position.
   * @param delta The position to move to
   */
  private changeScrollAndContentPosition(delta: number): void {
    this.isHorizontal ? this.changeHorizontalScrollPosition(delta) : this.changeVerticalScrollPosition(delta);
    // move the extendedScrollbarArea to the scrollbar's new position too
    this.extendedScrollbarArea.bounds.center = this.scrollbar.bounds.center;
    this.changeContentPosition();
  }

  /**
   * Change the horizontal scrollbar position and updates this.scrollAmount.
   * @param delta The amount to move.
   */
  private changeHorizontalScrollPosition(delta: number): void {
    const scrollLimitMin = 0;
    const scrollLimitMax = this.scrollTrackLength - this.scrollbar.bounds.width;
    // constrain the new position to the min and max limits
    this.scrollbar.position.x = Math.max(delta, scrollLimitMin);
    this.scrollbar.position.x = Math.min(this.scrollbar.position.x, scrollLimitMax);
    this.scrollAmount = this.scrollbar.position.x / scrollLimitMax;
  }

  /**
   * Change the vertical scrollbar position and updates this.scrollAmount.
   * @param delta The amount to move.
   */
  private changeVerticalScrollPosition(delta: number): void {
    const scrollLimitMin = 0;
    const scrollLimitMax = this.scrollTrackLength - this.scrollbar.bounds.height;
    // constrain the new position to the min and max limits
    this.scrollbar.position.y = Math.max(delta, scrollLimitMin);
    this.scrollbar.position.y = Math.min(this.scrollbar.position.y, scrollLimitMax);
    this.scrollAmount = this.scrollbar.position.y / scrollLimitMax;
  }

  /**
   * Change the content position based on this.scrollAmount.
   */
  private changeContentPosition(): void {
    const { content, contentOffsetStart, contentOffsetEnd } = this.scrollable;
    const contentMaxPosition = this.containerSize - (content.bounds[this.dimension] as number);
    const contentDistance = contentMaxPosition - contentOffsetStart! - contentOffsetEnd! * 2;
    (content.position[this.axis] as number) = (this.scrollAmount * contentDistance) + this.contentInitialPosition
      + contentOffsetStart!;
  }

  /**
   * Tool that handles scrollbar on drag event.
   */
  private scrollbarDragTool(): paper.Tool {
    const tool = new paper.Tool();
    let offsetPoint: paper.Point;
    tool.onMouseDown = (event) => {
      this.dragging = true;
      ScrollbarComponent.anyIsDragging = true;
      this.project.view.element.style.cursor = 'grabbing';
      offsetPoint = new paper.Point(event.downPoint.subtract(this.scrollbar.position));
    };
    tool.onMouseUp = (event: paper.ToolEvent) => {
      this.dragging = false;
      ScrollbarComponent.anyIsDragging = false;
      this.project.view.element.style.cursor = this.scrollbarHovering ? 'pointer' : 'default';
      if (!this.containerHovering) {
        this.visible = false;
        this.resetDefaultTool();
        this.setNormal();
      } else if (!this.scrollbarHovering) {
        this.setNormal();
      }
    };
    tool.onMouseDrag = (event: paper.ToolEvent) => {
      this.setActive();
      this.visible = true;
      return this.isHorizontal
        ? this.changeScrollAndContentPosition(event.point.x - offsetPoint.x)
        : this.changeScrollAndContentPosition(event.point.y - offsetPoint.y);
    };
    // arrowKeyDown tool is inactive while hovering on the scrollbar and scrollbarDrag tool is active. this handles
    // keyDown events
    tool.onKeyDown = (event) => {
      this.moveByKeyDown(event);
      this.activateDefaultTool();
    };
    return tool;
  }

  /**
   * Tool that handles key down event.
   */
  private arrowKeyDownTool(): paper.Tool {
    const tool = new paper.Tool();
    tool.onKeyDown = (event: paper.KeyEvent) => {
      this.moveByKeyDown(event);
    };
    return tool;
  }

  /**
   * Moves scrollbar and content by arrow keys.
   * @param event {paper.KeyEvent}
   */
  private moveByKeyDown(event: paper.KeyEvent) {
    const horizontalKeys = event.key === 'left' || event.key === 'right';
    const verticalKeys = event.key === 'up' || event.key === 'down';
    const keyPressDirection = (horizontalKeys && 'horizontal') || (verticalKeys && 'vertical');

    if (keyPressDirection === this.direction) {
      const movementAmount = Math.floor(this.getProportionalLength()) / 3;
      event.preventDefault();
      this.setActiveContinuously();
      switch (event.key) {
        case 'up':
          this.changeScrollAndContentPosition(this.scrollbar.position.y - movementAmount);
          break;
        case 'down':
          this.changeScrollAndContentPosition(this.scrollbar.position.y + movementAmount);
          break;
        case 'left':
          this.changeScrollAndContentPosition(this.scrollbar.position.x - movementAmount);
          break;
        case 'right':
          this.changeScrollAndContentPosition(this.scrollbar.position.x + movementAmount);
          break;
      }
    } else if (keyPressDirection === ScrollbarComponent.defaultScrollbarDirection) {
      ScrollbarComponent._defaultScrollbar!.moveByKeyDown(event);
    }
  }

  /**
   * Enables default active effects and any custom active effects. Scrollbar has full opacity.
   */
  private setActive(): void {
    if (this.enableDefaultEffects) {
      this.scrollbar.opacity = ACTIVE_SCROLLBAR_OPACITY;
    }
    if (this.customEffects.setActive) {
      this.customEffects.setActive();
    }
  }

  /**
   * Disables active effects and any custom inactive effects. Scrollbar is dimmed.
   */
  private setNormal(): void {
    if (this.enableDefaultEffects) {
      (this.scrollbar as any).tweenTo({
        opacity: NORMAL_SCROLLBAR_OPACITY
      }, 100);
    }
    if (this.customEffects.setNormal) {
      this.customEffects.setNormal();
    }
  }

  /**
   * Enables active effects while there is continuous input from scrolling or arrow keys.
   */
  private setActiveContinuously(): void {
    this.setActive();
    clearTimeout(this.activeScrollTimeout);
    this.activeScrollTimeout = setTimeout(() => {
      this.setNormal();
    }, 750);
  }
}
