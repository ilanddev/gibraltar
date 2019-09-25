import * as paper from 'paper';
import { LABEL_HORIZONTAL_PADDING } from '../constants/dimensions';
import { LabelComponent } from './label';

const ICON_SIZE = 10;
const ICON_MARGIN = 10;

/**
 * Entity Label Visual Component.
 */
export class EntityLabelComponent extends LabelComponent {

  // the entity icon
  readonly _icon: paper.Path.Rectangle;

  /**
   * Creates a new EntityLabelComponent instance.
   *
   * @param _text the text to be displayed on the label
   * @param iconColor the icon color specific to the entity type
   * @param _point the location that the entity label should be rendered at
   * @param fontWeight the font weight of the label. Defaults to 'normal' in parent
   */
  constructor(protected _text: string,
              private iconColor: paper.Color | string,
              protected _point: paper.Point = new paper.Point(0, 0),
              private _fontWeight: string | number = '') {
    super(_text, _point);
    this.applyMatrix = false;
    this.pivot = new paper.Point(0, 0);

    this._icon = new paper.Path.Rectangle({
      rectangle: new paper.Rectangle(0, 0, ICON_SIZE, ICON_SIZE),
      radius: 2,
      pivot: new paper.Point(0, 0),
      position: new paper.Point(ICON_MARGIN, ICON_MARGIN),
      fillColor: this.iconColor,
      parent: this
    });

    // change in font weight will change the background width and possibly trigger clipping that will be
    // handled by the parent
    if (this._fontWeight) {
      super.setFontWeight('bold');
    }

    // reposition and resize other elements to fit the icon
    this._label.position.x = this._icon.bounds.right + LABEL_HORIZONTAL_PADDING;
    this._background.bounds.width += ICON_SIZE + ICON_MARGIN;
  }

  /**
   * Gets the icon path item.
   */
  get icon(): paper.Path.Rectangle {
    return this._icon;
  }
}
