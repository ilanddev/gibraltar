import * as paper from 'paper';
import { VappComponent } from './vapp-component';
import { InternalNetworkComponent } from './internal-network-component';
import { IconService } from '../services/icon-service';
import { CONNECTOR_COLOR, HOVER_COLOR, PATH_COLOR, VAPP_BACKGROUND_COLOR } from '../constants/colors';
import { CONNECTOR_RADIUS, ICON_SIZE, PATH_STROKE_WIDTH, VAPP_BACKGROUND_PADDING } from '../constants/dimensions';
import { EventService } from '../services/event-service';
import {
  INTERNAL_NETWORK_MOUSE_ENTER, INTERNAL_NETWORK_MOUSE_LEAVE, VAPP_NETWORK_MOUSE_ENTER, VAPP_NETWORK_MOUSE_LEAVE
} from '../constants/events';
import { FenceModeType } from 'iland-sdk';
import { EventBuilder } from '../services/event-service';

/**
 * Virtual Application Connection Visual Component.
 */
export class VappConnectionComponent extends paper.Group {

  private _background: paper.Path.Rectangle;
  private _connectors: Array<paper.Path.Circle> = [];
  private _internalNetPaths: Array<paper.Path.Rectangle> = [];
  private _vappNetPaths: Array<paper.Path.Rectangle> = [];
  private _edgeIcon: paper.PlacedSymbol | undefined;

  constructor(private _vapp: VappComponent, private _internalNetworks: Array<InternalNetworkComponent>) {
    super();
    const self = this;
    this.applyMatrix = false;
    this.position = _vapp.position;
    let size = 0;
    for (const vappNet of this._vapp.getVappNetworkComponents()) {
      if (vappNet.getVappNetworkData().parentNetworkUuid === null) {
        const connectorCenter = new paper.Point((PATH_STROKE_WIDTH / 2) - (CONNECTOR_RADIUS) -
            (PATH_STROKE_WIDTH / 2), vappNet.bounds.center.y +
            (PATH_STROKE_WIDTH / 2));
        let connector = new paper.Path.Circle(connectorCenter, CONNECTOR_RADIUS);
        connector.fillColor = CONNECTOR_COLOR;
        self.addChild(connector);
        self._connectors.push(connector);
      } else {
        for (const intNet of this._internalNetworks) {
          if (vappNet.getVappNetworkData().parentNetworkUuid === intNet.getInternalNetworkData().uuid) {
            const pathLength = _vapp.bounds.left - intNet.getPath().bounds.right;
            size = pathLength > size ? pathLength : size;
            const connectorCenter = new paper.Point(-pathLength -
                (PATH_STROKE_WIDTH / 2), vappNet.bounds.center.y +
                (PATH_STROKE_WIDTH / 2));
            let connector = new paper.Path.Circle(connectorCenter, (CONNECTOR_RADIUS - (PATH_STROKE_WIDTH / 2)));
            connector.fillColor = VAPP_BACKGROUND_COLOR;
            connector.strokeColor = CONNECTOR_COLOR;
            connector.strokeWidth = PATH_STROKE_WIDTH;
            self.addChild(connector);
            self._connectors.push(connector);

            const intNetPathHeight = intNet.bounds.bottom > _vapp.bounds.bottom ? _vapp.getBackground().bounds.height :
                connectorCenter.y;
            const intNetPath = new paper.Path.Rectangle(
                new paper.Point(connectorCenter.x - (PATH_STROKE_WIDTH / 2), 0),
                new paper.Size(PATH_STROKE_WIDTH, intNetPathHeight));
            intNetPath.fillColor = PATH_COLOR;
            intNetPath.applyMatrix = false;
            intNetPath.pivot = new paper.Point(0, 0);
            self.addChild(intNetPath);
            self._internalNetPaths.push(intNetPath);

            const vappNetPath = new paper.Path.Rectangle(
                new paper.Point(connectorCenter.x + CONNECTOR_RADIUS, vappNet.position.y),
                new paper.Size(pathLength, PATH_STROKE_WIDTH));
            vappNetPath.fillColor = PATH_COLOR;
            vappNetPath.applyMatrix = false;
            vappNetPath.pivot = new paper.Point(0, 0);
            self.addChild(vappNetPath);
            self._vappNetPaths.push(vappNetPath);

            // bind hover handlers
            self.bindHoverHandlers(vappNet.getVappNetworkData().uuid, vappNetPath,
                intNet.getInternalNetworkData().uuid, intNetPath, vappNet.getVappNetworkData().fenceMode);
            // add edge gateway symbol if relevant
            if (vappNet.getVappNetworkData().fenceMode === 'NAT_ROUTED') {
              this._edgeIcon = IconService.getEdgeIcon().place();
              this.addChild(this._edgeIcon);
              this._edgeIcon.pivot = new paper.Point(0, 0);
              this._edgeIcon.position = new paper.Point(-(ICON_SIZE / 2), vappNet.position.y);
            }
          }
        }
      }
    }
    if (size > 0) {
      this._background = new paper.Path.Rectangle({
        rectangle: new paper.Rectangle(new paper.Point(-size - VAPP_BACKGROUND_PADDING, 0),
            new paper.Size(_vapp.bounds.width + size + VAPP_BACKGROUND_PADDING, _vapp.getBackground().bounds.height)),
        radius: 0
      });
      this._background.pivot = new paper.Point(0, 0);
      this._background.fillColor = VAPP_BACKGROUND_COLOR;
      this.addChild(this._background);
      this._background.sendToBack();
      this._background.style.shadowColor = new paper.Color(0, 0, 0, 0.04);
      this._background.style.shadowOffset = new paper.Point(0, 3);
      this._background.style.shadowBlur = 28;
    }
    self.addChildren(self._connectors);
  }

  private bindHoverHandlers(vappNetUuid: string, vappNetPath: paper.Path.Rectangle, intNetUuid: string,
                            intNetPath: paper.Path.Rectangle, fenceMode: FenceModeType) {
    const mouseEnterHandler = function(path: paper.Path) {
      path.fillColor = HOVER_COLOR;
      path.data.hovered = true;
    };
    const mouseLeaveHandler = function(path: paper.Path) {
      path.fillColor = PATH_COLOR;
      path.data.hovered = false;
    };
    intNetPath.onMouseEnter = vappNetPath.onMouseEnter = function() {
      EventService.publish(new EventBuilder(INTERNAL_NETWORK_MOUSE_ENTER, intNetUuid).build());
    };
    intNetPath.onMouseLeave = vappNetPath.onMouseLeave = function() {
      EventService.publish(new EventBuilder(INTERNAL_NETWORK_MOUSE_LEAVE, intNetUuid).build());
    };
    EventService.observable.filter(it => it.type === INTERNAL_NETWORK_MOUSE_ENTER &&
        intNetUuid === it.subjectUuid).subscribe((e) => {
          mouseEnterHandler(intNetPath);
          mouseEnterHandler(vappNetPath);
          if (e.sourceUuid !== vappNetUuid && fenceMode === 'BRIDGED') {
            EventService.publish(new EventBuilder(VAPP_NETWORK_MOUSE_ENTER, vappNetUuid, e).build());
          }
        });
    EventService.observable.filter(it => it.type === INTERNAL_NETWORK_MOUSE_LEAVE &&
        intNetUuid === it.subjectUuid).subscribe((e) => {
          mouseLeaveHandler(intNetPath);
          mouseLeaveHandler(vappNetPath);
          if (e.sourceUuid !== vappNetUuid && fenceMode === 'BRIDGED') {
            EventService.publish(new EventBuilder(VAPP_NETWORK_MOUSE_LEAVE, vappNetUuid, e).build());
          }
        });
    EventService.observable.filter(it => it.type === VAPP_NETWORK_MOUSE_ENTER &&
        vappNetUuid === it.subjectUuid).subscribe((e) => {
          if (e.sourceUuid !== intNetUuid && fenceMode === 'BRIDGED') {
            EventService.publish(new EventBuilder(INTERNAL_NETWORK_MOUSE_ENTER, intNetUuid, e).build());
          }
        });
    EventService.observable.filter(it => it.type === VAPP_NETWORK_MOUSE_LEAVE &&
        vappNetUuid === it.subjectUuid).subscribe((e) => {
          if (e.sourceUuid !== intNetUuid && fenceMode === 'BRIDGED') {
            EventService.publish(new EventBuilder(INTERNAL_NETWORK_MOUSE_LEAVE, intNetUuid, e).build());
          }
        });
  }

}
