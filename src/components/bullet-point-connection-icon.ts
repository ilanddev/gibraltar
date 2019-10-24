import * as paper from 'paper';
import { LIGHT_GREY } from '../constants/colors';
import { SMALL_CONNECTOR_SIZE } from '../constants/dimensions';

/**
 * Bullet Point Connection Icon Visual Component.
 * The small (7px) grey filled circle icon that represents special types of connections or bullet points for labels.
 * Used for isolated vApp Network labels or at the end of vApp networks that have no attached VNICs.
 */
export class BulletPointConnectionIconComponent extends paper.Group {

  // the small filled circle icon
  readonly _icon: paper.Path.Circle;

  /**
   * Creates a new BulletPointConnectionIconComponent instance.
   *
   * @param _point the location that the bullet connection icon should be rendered at
   */
  constructor(private _point: paper.Point = new paper.Point(0, 0)) {
    super();
    this.position = _point;
    this.pivot = new paper.Point(0, 0);

    this._icon = new paper.Path.Circle({
      position: new paper.Point(0, 0),
      radius: SMALL_CONNECTOR_SIZE / 2,
      fillColor: LIGHT_GREY,
      parent: this
    });
  }

  get icon(): paper.Path.Circle {
    return this._icon;
  }
}
