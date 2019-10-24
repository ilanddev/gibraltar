import * as paper from 'paper';
import { VAPP_BACKGROUND_COLOR } from '../constants/colors';
import { CONNECTOR_RADIUS } from '../constants/dimensions';
import { DEFAULT_STROKE_STYLE } from '../constants/styles';

/**
 * Connection Icon Visual Component.
 * The large (11px) open circle icon with a grey stroke that represents connections. Used for VNICs that are
 * attached and connected to a vApp Network or for the vApp Network to Org-Vdc network connections.
 */
export class ConnectionIconComponent extends paper.Group {

  // the stroked and 'unfilled' circle icon
  readonly _icon: paper.Path.Circle;

  /**
   * Creates a new ConnectionIconComponent instance.
   *
   * @param _point the location that the icon should be rendered at
   * @param _fillColor the inner fill color that usually matches the background color of the element it is on top of
   * to make it seem 'unfilled'
   */
  constructor(private _point: paper.Point = new paper.Point(0, 0),
              private _fillColor: paper.Color | string = VAPP_BACKGROUND_COLOR) {
    super();
    this.position = _point;
    this.pivot = new paper.Point(0, 0);

    this._icon = new paper.Path.Circle(
      {
        position: new paper.Point(0, 0),
        radius: CONNECTOR_RADIUS,
        style: DEFAULT_STROKE_STYLE,
        fillColor: this._fillColor,
        parent: this
      });
  }

  get icon(): paper.Path.Circle {
    return this._icon;
  }
}
