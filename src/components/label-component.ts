import * as paper from 'paper';
import { ACTIVE_COLOR, HOVER_COLOR, LABEL_BACKGROUND_COLOR, LABEL_TEXT_COLOR } from '../constants/colors';
import { LABEL_HEIGHT } from '../constants/dimensions';

const DEFAULT_MAX_LABEL_WIDTH = 130;
const VERTICAL_PADDING = 8;
export const HORIZONTAL_PADDING = 9;
const LABEL_FONT_SIZE = 14;
const STATUS_INDICATOR_MARGIN = 40;
const STATUS_DOT_RADIUS = 5;

/**
 * Label Visual Component.
 */
export class LabelComponent extends paper.Group {

  protected _label: paper.PointText;
  protected _background: paper.Path.Rectangle;
  protected _statusDot?: paper.Path.Circle;

  constructor(protected _text: string, protected _point: paper.Point = new paper.Point(0, 0),
              protected statusIndicatorColor?: string, protected maxWidth = DEFAULT_MAX_LABEL_WIDTH) {
    super();
    this.applyMatrix = false;
    this.position = _point;
    this._label = new paper.PointText(new paper.Point(HORIZONTAL_PADDING, LABEL_HEIGHT - (VERTICAL_PADDING * 2)));
    this._label.justification = 'left';
    this._label.fillColor = LABEL_TEXT_COLOR;
    this._label.content = _text;
    this._label.fontSize = LABEL_FONT_SIZE;
    this._label.pivot = new paper.Point(0, 0);
    this.clip();
    this._background = new paper.Path.Rectangle({
      rectangle: new paper.Rectangle(0, 0,
          this._label.bounds.width + (HORIZONTAL_PADDING * 2), LABEL_HEIGHT),
      radius: 3
    });
    this._background.fillColor = LABEL_BACKGROUND_COLOR;
    this._background.pivot = new paper.Point(0, 0);
    this.addChild(this._background);
    this.addChild(this._label);
    if (this.statusIndicatorColor !== undefined) {
      this._background.bounds.width = this._background.bounds.width + STATUS_INDICATOR_MARGIN;
      this._statusDot =
          new paper.Path.Circle(new paper.Point(this.bounds.rightCenter.x - (LABEL_HEIGHT / 2), LABEL_HEIGHT / 2),
              STATUS_DOT_RADIUS);
      this._statusDot.fillColor = this.statusIndicatorColor;
      this.addChild(this._statusDot);
    }
  }

  setHover() {
    this._label.fillColor = HOVER_COLOR;
  }

  setActive() {
    this._label.fillColor = ACTIVE_COLOR;
  }

  setNormal() {
    this._label.fillColor = LABEL_TEXT_COLOR;
  }

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
