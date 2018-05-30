import * as paper from 'paper';
import { Vnic } from 'iland-sdk';
import { CONNECTOR_COLOR, VAPP_BACKGROUND_COLOR } from '../constants/colors';
import { CONNECTOR_RADIUS, PATH_STROKE_WIDTH } from '../constants/dimensions';

/**
 * Virtual Network Interface Card Visual Component.
 */
export class VnicComponent extends paper.Group {

  private _circle: paper.Path.Circle;

  constructor(private _vnic: Vnic) {
    super();
    this.applyMatrix = false;
    if (_vnic.isConnected()) {
      this._circle = new paper.Path.Circle(new paper.Point(0, 0), CONNECTOR_RADIUS);
      this._circle.fillColor = CONNECTOR_COLOR;
    } else {
      this._circle = new paper.Path.Circle(new paper.Point(0, 0), CONNECTOR_RADIUS - (PATH_STROKE_WIDTH / 2));
      this._circle.fillColor = VAPP_BACKGROUND_COLOR;
      this._circle.strokeColor = CONNECTOR_COLOR;
      this._circle.strokeWidth = PATH_STROKE_WIDTH;
    }
    this.addChild(this._circle);
  }

  getVnic(): Vnic {
    return this._vnic;
  }

}
