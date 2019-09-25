import * as paper from 'paper';
import { LIGHT_GREY } from '../constants/colors';
import { SMALL_CONNECTOR_SIZE } from '../constants/dimensions';

/**
 * Small Connector Visual Component.
 */
export class SmallConnectorComponent extends paper.Group {

  // the small filled circle
  readonly _connector: paper.Path.Circle;

  /**
   * Creates a new VappEdgeLabelComponent instance.
   *
   * @param _point the location that the vapp edge label should be rendered at
   */
  constructor(private _point: paper.Point = new paper.Point(0, 0)) {
    super();
    this.applyMatrix = false;
    this.position = _point;
    this.pivot = new paper.Point(0, 0);

    this._connector = new paper.Path.Circle({
      position: new paper.Point(0, 0),
      radius: SMALL_CONNECTOR_SIZE / 2,
      fillColor: LIGHT_GREY,
      parent: this
    });
  }

  get connector(): paper.Path.Circle {
    return this._connector;
  }
}
