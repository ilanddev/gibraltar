import * as paper from 'paper';
import { LABEL_HORIZONTAL_PADDING } from '../constants/dimensions';
import { LabelComponent } from './label';
import { TextOptions } from './label-text';

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
   * @param textOptions the paper.PointText options object to customize the text
   */
  constructor(protected _text: string,
              protected iconColor: paper.Color | string,
              protected _point: paper.Point = new paper.Point(0, 0),
              protected textOptions: TextOptions = {}) {
    super(_text, _point, textOptions);
    this.pivot = new paper.Point(0, 0);

    this._icon = new paper.Path.Rectangle({
      rectangle: new paper.Rectangle(0, 0, ICON_SIZE, ICON_SIZE),
      radius: 2,
      pivot: new paper.Point(0, 0),
      position: new paper.Point(ICON_MARGIN, ICON_MARGIN),
      fillColor: this.iconColor,
      parent: this
    });

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
