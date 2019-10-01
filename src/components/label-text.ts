import * as paper from 'paper';
import { DEFAULT_MAX_LABEL_WIDTH } from '../constants/dimensions';
import { WHITE } from '../constants/colors';

const TEXT_COLOR = WHITE;
export const FONT_SIZE = 13;
const LINE_HEIGHT = 15;
// TODO: custom font loads asynchronously after the canvas renders. this causes any reliant background items to
//  prematurely render at the wrong size. re-enable 'Roboto' custom font when a solution for canvas font loading is
//  implemented. can try redraw on frame method or redraw once font is loaded to the HTML canvas.
const FONT_FAMILY = 'Roboto';

export type TextOptions = Record<string, any>;

/**
 * Label Text Visual Component.
 */
export class LabelTextComponent extends paper.Group {

  // the label text
  protected _label: paper.PointText;

  /**
   * Creates a new LabelTextComponent instance.
   *
   * @param _text the text to be displayed
   * @param _point the location that the label text should be rendered at
   * @param textOptions the paper.PointText options object to customize the text properties
   * @param maxWidth the maximum width of the label (text will be truncated with an ellipsis if the max width is
   * exceeded)
   *
   * @example
   * // basic configuration
   * const text = new LabelTextComponent('Hello', new paper.Point(10, 30));
   *
   * @example
   * // with text options
   * const textOptions = {
   *   fontWeight: 'bold',
   *   justification: 'right',
   *   fillColor: new paper.Color('blue'),
   *   fontSize: 30,
   *   leading: 35
   * }
   * const fancyText = new LabelTextComponent('Salutations', new paper.Point(10, 5), textOptions);
   */
  constructor(protected _text: string,
              protected _point: paper.Point = new paper.Point(0, 0),
              protected textOptions: TextOptions = {},
              protected maxWidth = DEFAULT_MAX_LABEL_WIDTH) {
    super();
    this.pivot = new paper.Point(0, 0);
    this.position = _point;

    this._label = new paper.PointText({
      pivot: new paper.Point(0, 0),
      justification: 'left',
      fillColor: TEXT_COLOR,
      fontSize: FONT_SIZE,
      leading: LINE_HEIGHT,
      content: _text,
      ...textOptions,
      parent: this
    });

    this.clip();
  }

  /**
   * Gets the text component.
   */
  get text(): paper.PointText {
    return this._label;
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
