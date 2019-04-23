import * as paper from 'paper';
import { LABEL_HORIZONTAL_PADDING } from '../constants/dimensions';

const HEIGHT = 30;
const TEXT_COLOR = '#FFFFFF';
const TEXT_HOVER_COLOR = '#FFFFFF';
const ACTIVE_TEXT_COLOR = '#252A3A';
const ACTIVE_BACKGROUND_COLOR = '#FFFFFF';
const BACKGROUND_COLOR = '#191C28';
const HOVER_BACKGROUND_COLOR = '#242A3B';
export const VERTICAL_PADDING_TOP = 6;
export const FONT_SIZE = 13;
const LINE_HEIGHT = 15;
const DEFAULT_MAX_LABEL_WIDTH = 200;

/**
 * LabelComponent Visual Component.
 */
export class LabelComponent extends paper.Group {

  // the text label
  protected _label: paper.PointText;
  // the background item
  protected _background: paper.Path.Rectangle;

  /**
   * Creates a new LabelComponent instance.
   *
   * @param _text the text to be displayed on the label
   * @param _point the location to render the label at
   * @param maxWidth the maximum width of the label (text will be truncated with an ellipsis if the max width is
   * exceeded)
   */
  constructor(protected _text: string, protected _point: paper.Point = new paper.Point(0, 0),
              protected maxWidth = DEFAULT_MAX_LABEL_WIDTH) {
    super();
    this.applyMatrix = false;
    this.position = _point;
    this._label = new paper.PointText(new paper.Point(LABEL_HORIZONTAL_PADDING, VERTICAL_PADDING_TOP +
        FONT_SIZE));
    this._label.justification = 'left';
    this._label.fillColor = TEXT_COLOR;
    this._label.content = _text;
    this._label.fontSize = FONT_SIZE;
    this._label.leading = LINE_HEIGHT;
    this._label.pivot = new paper.Point(0, 0);
    this.clip();
    this._background = new paper.Path.Rectangle({
      rectangle: new paper.Rectangle(0, 0,
          this._label.bounds.width + (LABEL_HORIZONTAL_PADDING * 2), HEIGHT),
      radius: 3
    });
    this._background.fillColor = BACKGROUND_COLOR;
    this._background.pivot = new paper.Point(0, 0);
    this.addChild(this._background);
    this.addChild(this._label);
  }

  /**
   * Gets the label text component.
   */
  getTextComponent(): paper.PointText {
    return this._label;
  }

  /**
   * Gets the label background component.
   */
  getBackgroundComponent(): paper.Path.Rectangle {
    return this._background;
  }

  /**
   * Sets the label to its visual hover state.
   */
  setHover() {
    this._label.fillColor = TEXT_HOVER_COLOR;
    this._background.fillColor = HOVER_BACKGROUND_COLOR;
  }

  /**
   * Sets the label to its visual normal state.
   */
  setNormal() {
    this._label.fillColor = TEXT_COLOR;
    this._background.fillColor = BACKGROUND_COLOR;
  }

  /**
   * Sets the label to its visual active state;
   */
  setActive() {
    this._label.fillColor = ACTIVE_TEXT_COLOR;
    this._background.fillColor = ACTIVE_BACKGROUND_COLOR;
  }

  /**
   * Clips the text and inserts an ellipsis to ensure that the max width is not exceeded.
   */
  private clip() {
    let clipped = false;
    while (this._label.bounds.width > this.maxWidth) {
      clipped = true;
      this._label.content = this._label.content.substring(0, this._label.content.length - 1);
    }
    if (clipped) {
      this._label.content = this._label.content.substring(0, this._label.content.length - 3) + '...';
    }
  }

}
