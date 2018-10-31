import * as paper from 'paper';
import { Vnic } from 'iland-sdk';
import { CONNECTOR_COLOR, VAPP_BACKGROUND_COLOR } from '../constants/colors';
import { CONNECTOR_RADIUS, PATH_STROKE_WIDTH } from '../constants/dimensions';
import { EventService } from '../services/event-service';
import { VNIC_MOUSE_ENTER } from '../constants/events';
import { VNIC_MOUSE_LEAVE } from '../constants/events';
import { VnicData } from '../model/vnic-data';
import { EventBuilder } from '../services/event-service';

/**
 * Virtual Network Interface Card Visual Component.
 */
export class VnicComponent extends paper.Group {

  private _circle: paper.Path.Circle;

  constructor(private _vnic: VnicData) {
    super();
    this.applyMatrix = false;
    if (_vnic.getVnic().isConnected) {
      this._circle = new paper.Path.Circle(new paper.Point(0, 0), CONNECTOR_RADIUS);
      this._circle.fillColor = CONNECTOR_COLOR;
    } else {
      this._circle = new paper.Path.Circle(new paper.Point(0, 0), CONNECTOR_RADIUS - (PATH_STROKE_WIDTH / 2));
      this._circle.fillColor = VAPP_BACKGROUND_COLOR;
      this._circle.strokeColor = CONNECTOR_COLOR;
      this._circle.strokeWidth = PATH_STROKE_WIDTH;
    }
    this.addChild(this._circle);
    this.onMouseEnter = this.mouseEnter;
    this.onMouseLeave = this.mouseLeave;
  }

  getVnic(): Vnic {
    return this._vnic.getVnic();
  }

  getVmUuid(): string {
    return this._vnic.getVmUuid();
  }

  private mouseEnter(event: paper.MouseEvent): void {
    EventService.publish(new EventBuilder(VNIC_MOUSE_ENTER, this._vnic.getVmUuid())
        .setDataValue('vnic', this._vnic).build());
  }

  private mouseLeave(event: paper.MouseEvent): void {
    EventService.publish(new EventBuilder(VNIC_MOUSE_LEAVE, this._vnic.getVmUuid())
        .setDataValue('vnic', this._vnic).build());
  }

}
