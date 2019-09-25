import * as paper from 'paper';
import { VAPP_BACKGROUND_COLOR } from '../constants/colors';
import { CONNECTOR_RADIUS } from '../constants/dimensions';
import { DEFAULT_STROKE_STYLE } from '../constants/styles';

/**
 * Connector Visual Component.
 */
export class ConnectorComponent extends paper.Group {

  // the stroked circle item
  readonly _connector: paper.Path.Circle;

  /**
   * Creates a new ConnectorComponent instance.
   *
   * @param _point the location that the connector should be rendered at
   * @param _fillColor the inner fill color that usually matches the background color of the element it is on top of
   */
  constructor(private _point: paper.Point = new paper.Point(0, 0),
              private _fillColor: paper.Color | string = VAPP_BACKGROUND_COLOR) {
    super();
    this.applyMatrix = false;
    this.position = _point;
    this.pivot = new paper.Point(0, 0);

    this._connector = new paper.Path.Circle(
      {
        position: new paper.Point(0, 0),
        radius: CONNECTOR_RADIUS,
        style: DEFAULT_STROKE_STYLE,
        fillColor: this._fillColor,
        parent: this
      });
  }

  get connector(): paper.Path.Circle {
    return this._connector;
  }
}
