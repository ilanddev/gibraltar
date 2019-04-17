import * as paper from 'paper';
import {
  ACTIVE_COLOR,
  HOVER_BG_COLOR,
  HOVER_COLOR,
  LABEL_BACKGROUND_COLOR,
  LABEL_TEXT_COLOR
} from '../constants/colors';
import { LABEL_HEIGHT } from '../constants/dimensions';

const DEFAULT_MAX_LABEL_WIDTH = 200;
const VERTICAL_PADDING_TOP = 8;
export const HORIZONTAL_PADDING = 9;
const LABEL_FONT_SIZE = 13;

/**
 * Label Visual Component.
 */
export class LabelComponent extends paper.Group {

  protected _label: paper.PointText;
  protected _background: paper.Path.Rectangle;

  constructor(protected _text: string, protected _point: paper.Point = new paper.Point(0, 0),
              protected maxWidth = DEFAULT_MAX_LABEL_WIDTH) {
    super();
    this.applyMatrix = false;
    this.position = _point;
    this._label = new paper.PointText(new paper.Point(HORIZONTAL_PADDING, VERTICAL_PADDING_TOP +
        LABEL_FONT_SIZE - 2));
    this._label.justification = 'left';
    this._label.fillColor = LABEL_TEXT_COLOR;
    this._label.content = _text;
    this._label.fontSize = LABEL_FONT_SIZE;
    this._label.leading = 15;
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
  }

  setHover() {
    this._label.fillColor = HOVER_COLOR;
    this._background.fillColor = HOVER_BG_COLOR;
  }

  setActive() {
    this._label.fillColor = ACTIVE_COLOR;
  }

  setNormal() {
    this._label.fillColor = LABEL_TEXT_COLOR;
    this._background.fillColor = LABEL_BACKGROUND_COLOR;
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
