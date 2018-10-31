import * as paper from 'paper';
import { EventService } from '../services/event-service';
import { EDGE_MOUSE_ENTER } from '../constants/events';
import { EDGE_MOUSE_LEAVE } from '../constants/events';
import { Edge } from 'iland-sdk';
import { IconService } from '../services/icon-service';
import { EventBuilder } from '../services/event-service';

/**
 * Edge Component.
 */
export class EdgeComponent extends paper.Group {

  constructor(private _edge: Edge, position: paper.Point) {
    super();
    const self = this;
    this.applyMatrix = false;
    this.position = position;
    const edgeIcon = IconService.getEdgeIcon().place();
    self.addChild(edgeIcon);
    self.onMouseEnter = self.mouseEnter;
    self.onMouseLeave = self.mouseLeave;
  }

  private mouseEnter(event: paper.MouseEvent): void {
    EventService.publish(new EventBuilder(EDGE_MOUSE_ENTER, this._edge.uuid).setDataValue('edge', this._edge).build());
  }

  private mouseLeave(event: paper.MouseEvent): void {
    EventService.publish(new EventBuilder(EDGE_MOUSE_LEAVE, this._edge.uuid).setDataValue('edge', this._edge).build());
  }
}
