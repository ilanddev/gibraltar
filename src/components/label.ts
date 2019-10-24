import * as paper from 'paper';
import { LABEL_HORIZONTAL_PADDING, LABEL_HEIGHT, DEFAULT_MAX_LABEL_WIDTH } from '../constants/dimensions';
import { LabelTextComponent, TextOptions, FONT_SIZE } from './label-text';
import { WHITE, CANVAS_BACKGROUND_COLOR } from '../constants/colors';

const TEXT_COLOR = WHITE;
const TEXT_HOVER_COLOR = WHITE;
const ACTIVE_TEXT_COLOR = '#252A3A';
const ACTIVE_BACKGROUND_COLOR = WHITE;
const BACKGROUND_COLOR = CANVAS_BACKGROUND_COLOR;
const HOVER_BACKGROUND_COLOR = '#242A3B';
export const VERTICAL_PADDING_TOP = 6;

/**
 * Label Visual Component.
 */
export class LabelComponent extends LabelTextComponent {

  // the background item
  protected _background: paper.Path.Rectangle;

  /**
   * Creates a new LabelComponent instance.
   *
   * @param _text the text to be displayed on the label
   * @param _point the location to render the label at
   * @param textOptions the paper.PointText options object to customize the text properties
   * @param maxWidth the maximum width of the label (text will be truncated with an ellipsis if the max width is
   * exceeded)
   */
  constructor(protected _text: string,
              protected _point: paper.Point = new paper.Point(0, 0),
              protected textOptions: TextOptions = {},
              protected maxWidth = DEFAULT_MAX_LABEL_WIDTH) {
    super(_text, _point, textOptions, maxWidth);
    this.pivot = new paper.Point(0, 0);
    this.position = _point;

    this._label.position = new paper.Point(LABEL_HORIZONTAL_PADDING, VERTICAL_PADDING_TOP + FONT_SIZE);

    this._background = new paper.Path.Rectangle({
      rectangle: new paper.Rectangle(0, 0,
          this._label.bounds.width + (LABEL_HORIZONTAL_PADDING * 2), LABEL_HEIGHT),
      radius: 3,
      fillColor: BACKGROUND_COLOR,
      pivot: new paper.Point(0, 0)
    });

    this.addChildren([this._background, this._label]);
  }

  /**
   * Gets the label background component.
   */
  get background(): paper.Path.Rectangle {
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
   * Sets the label to its visual active state.
   */
  setActive() {
    this._label.fillColor = ACTIVE_TEXT_COLOR;
    this._background.fillColor = ACTIVE_BACKGROUND_COLOR;
  }

}
