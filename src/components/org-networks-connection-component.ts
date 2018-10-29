import * as paper from 'paper';
import { InternalNetworkComponent } from './internal-network-component';
import { ExternalNetworkComponent } from './external-network-component';
import { Edge } from 'iland-sdk';
import { CONNECTOR_COLOR, HOVER_COLOR, PATH_COLOR, VAPP_BACKGROUND_COLOR } from '../constants/colors';
import { CONNECTOR_RADIUS, PATH_STROKE_WIDTH } from '../constants/dimensions';
import { EventService } from '../services/event-service';
import {
  EXTERNAL_NETWORK_MOUSE_ENTER,
  EXTERNAL_NETWORK_MOUSE_LEAVE,
  INTERNAL_NETWORK_MOUSE_ENTER,
  INTERNAL_NETWORK_MOUSE_LEAVE
} from '../constants/events';
import 'rxjs/add/operator/filter';
import { EdgeComponent } from './edge-component';

// TODO extract constants
const ISOLATED_NET_STUB_SIZE = 50;
const UPLINK_SPACING = 50;
const HIGH_EDGE_OFFSET = 85;
const LOW_EDGE_OFFSET = 60;

/**
 * Org Networks Connection Visual Component.
 */
export class OrgNetworksConnectionComponent extends paper.Group {

  constructor(private _externalNetworks: Array<ExternalNetworkComponent>,
              private _internalNetworks: Array<InternalNetworkComponent>,
              private _edges: Array<Edge>) {
    super();
    const self = this;
    this.applyMatrix = false;
    this.position = new paper.Point(0, 0);
    const natRoutedMap: Map<string, Array<InternalNetworkComponent>> = new Map();
    for (const intNet of this._internalNetworks) {
      switch (intNet.getInternalNetworkData().fenceMode) {
        case 'NAT_ROUTED': {
          const edgeUuid = intNet.getInternalNetworkData().edgeUuid!;
          if (!natRoutedMap.has(edgeUuid!)) {
            natRoutedMap.set(edgeUuid, [intNet]);
          } else {
            natRoutedMap.get(edgeUuid)!.push(intNet);
          }
          break;
        }
        case 'ISOLATED': {
          let size = new paper.Size(PATH_STROKE_WIDTH, -ISOLATED_NET_STUB_SIZE);
          const path = new paper.Path.Rectangle(intNet.getPath().bounds.topLeft, size);
          path.fillColor = PATH_COLOR;
          path.applyMatrix = false;
          path.pivot = new paper.Point(0, 0);
          this.addChild(path);
          const circle = new paper.Path.Circle(path.bounds.topCenter, CONNECTOR_RADIUS);
          circle.fillColor = CONNECTOR_COLOR;
          this.addChild(circle);
          this.bindIsolatedHoverHandlers(intNet.getInternalNetworkData().uuid, path);
          break;
        }
        case 'BRIDGED': {
          const extNet = _externalNetworks.find(
              n => n.getExternalNetworkData().uuid === intNet.getInternalNetworkData().parentNetworkUuid);
          const y = extNet!.localToParent(extNet!.getPath().bounds.center).y;
          let size = new paper.Size(PATH_STROKE_WIDTH, y);
          const path = new paper.Path.Rectangle(intNet.getPath().bounds.topLeft, size);
          path.fillColor = PATH_COLOR;
          path.applyMatrix = false;
          path.pivot = new paper.Point(0, 0);
          this.addChild(path);
          const connector = new paper.Path.Circle(path.bounds.topCenter, CONNECTOR_RADIUS - (PATH_STROKE_WIDTH / 2));
          connector.fillColor = VAPP_BACKGROUND_COLOR;
          connector.strokeColor = CONNECTOR_COLOR;
          connector.strokeWidth = PATH_STROKE_WIDTH;
          this.addChild(connector);
          this.bindBridgedHoverHandlers(extNet!.getExternalNetworkData().uuid,
              intNet.getInternalNetworkData().uuid, path);
          break;
        }
      }
    }
    let idx = 0;
    natRoutedMap.forEach(function(intNets: Array<InternalNetworkComponent>, edgeUuid: string) {
      const centerX = intNets.map(n => n.bounds.center.x).reduce((p, c) => p + c, 0) / intNets.length;
      const centerY = idx % 1 === 0 ? -LOW_EDGE_OFFSET : -HIGH_EDGE_OFFSET;
      const edgeCenter = new paper.Point(centerX, centerY);
      for (const net of intNets) {
        let size = new paper.Size(PATH_STROKE_WIDTH, centerY + 30);
        const path = new paper.Path.Rectangle(net.getPath().bounds.topLeft, size);
        path.fillColor = PATH_COLOR;
        path.applyMatrix = false;
        path.pivot = new paper.Point(0, 0);
        path.strokeWidth = 0;
        self.addChild(path);
        const srx = path.bounds.topCenter.x - edgeCenter.x;
        const rx = Math.abs(srx);
        const dir = -(srx / rx);
        const ry = Math.abs(path.bounds.topCenter.y - edgeCenter.y);
        const theta = Math.atan(rx / ry);
        const dx = PATH_STROKE_WIDTH * Math.cos(theta) / 2;
        const dy = PATH_STROKE_WIDTH * Math.sin(theta) / 2;
        const x = dir > 0 ? path.bounds.topLeft.x + dx : path.bounds.topRight.x - dx;
        const from = new paper.Point(x, path.bounds.topLeft.y + dy);
        const pathTo = new paper.Path.Line(from, edgeCenter);
        pathTo.strokeColor = PATH_COLOR;
        pathTo.strokeWidth = PATH_STROKE_WIDTH;
        self.addChild(pathTo);
        self.bindInternalNatRoutedHoverHandlers(net.getInternalNetworkData().uuid, path, pathTo);
      }
      const edge = _edges.find(e => e.uuid === edgeUuid)!;
      const uplinks = edge.interfaces.filter(i => i.type === 'uplink');
      for (const uplink of uplinks) {
        const x = centerX - (((uplinks.length - 1) / 2) * UPLINK_SPACING) - (PATH_STROKE_WIDTH / 2);
        const extNet = _externalNetworks.find(n => n.getExternalNetworkData().uuid === uplink.networkUuid);
        const extNetY = extNet!.localToParent(extNet!.getPath().bounds.center).y;
        let size = new paper.Size(PATH_STROKE_WIDTH, (extNetY - (centerY - 30)));
        const lowPoint = new paper.Point(x, centerY - 30);
        const path = new paper.Path.Rectangle(lowPoint, size);
        path.fillColor = PATH_COLOR;
        path.applyMatrix = false;
        path.pivot = new paper.Point(0, 0);
        path.strokeWidth = 0;
        self.addChild(path);
        const extNetPoint = new paper.Point(x + (PATH_STROKE_WIDTH / 2), lowPoint.y);
        const pathTo = new paper.Path.Line(extNetPoint,
            edgeCenter);
        pathTo.strokeColor = PATH_COLOR;
        pathTo.strokeWidth = PATH_STROKE_WIDTH;
        self.addChild(pathTo);
        const connector = new paper.Path.Circle(
            new paper.Point(x + (PATH_STROKE_WIDTH / 2), extNetY), CONNECTOR_RADIUS -
            (PATH_STROKE_WIDTH / 2));
        connector.fillColor = VAPP_BACKGROUND_COLOR;
        connector.strokeColor = CONNECTOR_COLOR;
        connector.strokeWidth = PATH_STROKE_WIDTH;
        self.addChild(connector);
        self.bindExternalNatRoutedHoverHandlers(uplink.networkUuid!, path, pathTo);
      }
      self.addChild(new EdgeComponent(edge, edgeCenter));
      idx++;
    });
  }

  private bindExternalNatRoutedHoverHandlers(extNetUuid: string, ...paths: Array<paper.Path>) {
    const mouseEnterHandler = function() {
      paths.forEach((path) => path.fillColor = path.strokeColor = HOVER_COLOR);
    };
    const mouseLeaveHandler = function() {
      paths.forEach((path) => path.fillColor = path.strokeColor = PATH_COLOR);
    };
    paths.forEach((path) => {
      path.onMouseEnter = function() {
        EventService.dispatch(EXTERNAL_NETWORK_MOUSE_ENTER, extNetUuid);
      };
      path.onMouseLeave = function() {
        EventService.dispatch(EXTERNAL_NETWORK_MOUSE_LEAVE, extNetUuid);
      };
    });
    // TODO cleanup in destroy method
    EventService.observable.filter(it => it.type === EXTERNAL_NETWORK_MOUSE_ENTER &&
        extNetUuid === it.subjectUuid).subscribe(mouseEnterHandler);
    EventService.observable.filter(it => it.type === EXTERNAL_NETWORK_MOUSE_LEAVE &&
        extNetUuid === it.subjectUuid).subscribe(mouseLeaveHandler);
  }

  private bindInternalNatRoutedHoverHandlers(intNetUuid: string, ...paths: Array<paper.Path>) {
    const mouseEnterHandler = function() {
      paths.forEach((path) => path.fillColor = path.strokeColor = HOVER_COLOR);
    };
    const mouseLeaveHandler = function() {
      paths.forEach((path) => path.fillColor = path.strokeColor = PATH_COLOR);
    };
    paths.forEach((path) => {
      path.onMouseEnter = function() {
        EventService.dispatch(INTERNAL_NETWORK_MOUSE_ENTER, intNetUuid);
      };
      path.onMouseLeave = function() {
        EventService.dispatch(INTERNAL_NETWORK_MOUSE_LEAVE, intNetUuid);
      };
    });
    // TODO cleanup in destroy method
    EventService.observable.filter(it => it.type === INTERNAL_NETWORK_MOUSE_ENTER &&
        intNetUuid === it.subjectUuid).subscribe(mouseEnterHandler);
    EventService.observable.filter(it => it.type === INTERNAL_NETWORK_MOUSE_LEAVE &&
        intNetUuid === it.subjectUuid).subscribe(mouseLeaveHandler);
  }

  private bindIsolatedHoverHandlers(intNetUuid: string, path: paper.Path.Rectangle) {
    const mouseEnterHandler = function() {
      path.fillColor = HOVER_COLOR;
    };
    const mouseLeaveHandler = function() {
      path.fillColor = PATH_COLOR;
    };
    path.onMouseEnter = function() {
      EventService.dispatch(INTERNAL_NETWORK_MOUSE_ENTER, intNetUuid);
    };
    path.onMouseLeave = function() {
      EventService.dispatch(INTERNAL_NETWORK_MOUSE_LEAVE, intNetUuid);
    };
    // TODO cleanup in destroy method
    EventService.observable.filter(it => it.type === INTERNAL_NETWORK_MOUSE_ENTER &&
        intNetUuid === it.subjectUuid).subscribe(mouseEnterHandler);
    EventService.observable.filter(it => it.type === INTERNAL_NETWORK_MOUSE_ENTER &&
        intNetUuid === it.subjectUuid).subscribe(mouseLeaveHandler);
  }

  private bindBridgedHoverHandlers(extNetUuid: string, intNetUuid: string, path: paper.Path.Rectangle) {
    const mouseEnterHandler = function(path: paper.Path) {
      path.fillColor = HOVER_COLOR;
      path.data.hovered = true;
    };
    const mouseLeaveHandler = function(path: paper.Path) {
      path.fillColor = PATH_COLOR;
      path.data.hovered = false;
    };
    const isPathHovered = function(path: paper.Path): boolean {
      return path.data.hovered;
    };
    path.onMouseEnter = function() {
      EventService.dispatch(INTERNAL_NETWORK_MOUSE_ENTER, intNetUuid);
    };
    path.onMouseLeave = function() {
      EventService.dispatch(INTERNAL_NETWORK_MOUSE_LEAVE, intNetUuid);
    };
    // TODO cleanup in destroy method
    EventService.observable.filter(it => it.type === INTERNAL_NETWORK_MOUSE_ENTER &&
        intNetUuid === it.subjectUuid).subscribe(() => {
          mouseEnterHandler(path);
          EventService.dispatch(EXTERNAL_NETWORK_MOUSE_ENTER, extNetUuid);
        });
    EventService.observable.filter(it => it.type === INTERNAL_NETWORK_MOUSE_LEAVE &&
        intNetUuid === it.subjectUuid).subscribe(() => {
          mouseLeaveHandler(path);
          EventService.dispatch(EXTERNAL_NETWORK_MOUSE_LEAVE, extNetUuid);
        });
    EventService.observable.filter(it => it.type === EXTERNAL_NETWORK_MOUSE_ENTER &&
        extNetUuid === it.subjectUuid).subscribe(() => {
          if (!isPathHovered(path)) {
            EventService.dispatch(INTERNAL_NETWORK_MOUSE_ENTER, intNetUuid);
          }
        });
    EventService.observable.filter(it => it.type === EXTERNAL_NETWORK_MOUSE_LEAVE &&
        extNetUuid === it.subjectUuid).subscribe(() => {
          if (isPathHovered(path)) {
            EventService.dispatch(INTERNAL_NETWORK_MOUSE_LEAVE, intNetUuid);
          }
        });
  }

}
