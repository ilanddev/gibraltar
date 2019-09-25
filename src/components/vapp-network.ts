import * as paper from 'paper';
import { CANVAS_BACKGROUND_COLOR } from '../constants/colors';
import { IsolatedNetworkLabelComponent } from './isolated-network-label';
import { VappEdgeLabelComponent } from './vapp-edge-label';
import { ConnectorComponent } from './connector';
import { SmallConnectorComponent } from './small-connector';
import { CONNECTOR_RADIUS, CONNECTOR_MARGIN, VAPP_PADDING, LABEL_HEIGHT, DEFAULT_STROKE_WIDTH, LABEL_BOTTOM_PADDING }
  from '../constants/dimensions';
import { DEFAULT_STROKE_STYLE } from '../constants/styles';

const MULTIPLE_ISOLATED_NETWORK_PADDING = 13;
const ISOLATED_NETWORK_PADDING = 5;

export type FenceMode = 'BRIDGED' | 'NAT_ROUTED' | 'ISOLATED';

/**
 * Interface for vApp network data.
 */
export interface VappNetworkData {
  uuid: string;
  name: string;
  vapp_uuid: string;
  fence_mode: FenceMode;
}

/**
 * Virtual Application Network Visual Component.
 */
export class VappNetworkComponent extends paper.Group {

  readonly _path: paper.Path.Line;
  // connection icon or isolated network label at the top of the network path
  private connectionComponent: ConnectorComponent | IsolatedNetworkLabelComponent;
  readonly edgeLabel: VappEdgeLabelComponent;
  readonly isNatRouted: boolean = false;
  readonly isIsolated: boolean = false;
  // network has no attached vnics
  private isDisconnected: boolean = false;

  /**
   * Creates a new VappNetworkComponent instance.
   *
   * @param _vappNetwork the vapp network data
   * @param _point the location that the vapp network should be rendered at
   * @param edgeNetworkCount the number of nat-routed networks
   * @param topmostPointY the y coordinate of the matching org-vdc network it will be connected to
   */
  // TODO: 59 is hardcoded to topmostPointY in for the vapp demo. replace it with the matching org-vdc vertical position
  //  when it's eventually added
  constructor(private _vappNetwork: VappNetworkData,
              private _point: paper.Point = new paper.Point(0, 0),
              private edgeNetworkCount: number = 0,
              private topmostPointY: number = 59) {
    super();
    this.applyMatrix = false;
    this.pivot = new paper.Point(0, 0);
    this.position = this._point;

    this.isNatRouted = this._vappNetwork.fence_mode === 'NAT_ROUTED';
    this.isIsolated = this._vappNetwork.fence_mode === 'ISOLATED';

    // create and start the network path at the vApp top boundary
    this._path = new paper.Path.Line({
      segment: new paper.Point(0, 0),
      style: DEFAULT_STROKE_STYLE,
      parent: this
    });

    // add vapp edge label if needed
    if (this.isNatRouted) {
      const pointX = -CONNECTOR_MARGIN - CONNECTOR_RADIUS;
      const pointY = (LABEL_HEIGHT + LABEL_BOTTOM_PADDING + DEFAULT_STROKE_WIDTH) * edgeNetworkCount
        + VAPP_PADDING + LABEL_HEIGHT + LABEL_BOTTOM_PADDING;
      this.edgeLabel = new VappEdgeLabelComponent(this._vappNetwork.name, new paper.Point(pointX, pointY));
      this.addChild(this.edgeLabel);
    }
  }

  /**
   * Gets the network path.
   */
  get path(): paper.Path.Line {
    return this._path;
  }

  /**
   * Gets the VAppNetworkData.
   */
  get data(): VappNetworkData {
    return this._vappNetwork;
  }

  /**
   * Sets the topmost segment outside of the vApp and connection icon.
   * @param isolatedCount the number of isolated networks used to determine the topmost point.
   */
  setTopmostSegmentAndConnection(isolatedCount: number): void {
    // create the topmost point
    const topmostPositionY = this.isIsolated
      ? (CONNECTOR_RADIUS + MULTIPLE_ISOLATED_NETWORK_PADDING) * isolatedCount + ISOLATED_NETWORK_PADDING
      : this.topmostPointY + CONNECTOR_RADIUS;
    const topmostPoint = new paper.Point(0, -topmostPositionY);
    // add the topmost point to the path
    this.path.add(topmostPoint);
    // add the connection component based on network's fence mode
    this.connectionComponent = this.isIsolated
      ? new IsolatedNetworkLabelComponent(this._vappNetwork.name, topmostPoint)
      : new ConnectorComponent(topmostPoint, CANVAS_BACKGROUND_COLOR);
    this.addChild(this.connectionComponent);
  }

  /**
   * Sets the bottommost segment if the vApp has at least one attached VNIC.
   * @param pointY the y coordinate of the vApp network's lowest attached VNIC.
   */
  setBottommostSegment(pointY: number): void {
    this._path.add(new paper.Point(0, pointY));
  }

  /**
   * Sets the bottommost segment and connection icon if the vApp has no attached VNICs.
   */
  setDisconnected(): void {
    this.isDisconnected = true;
    if (!this.isNatRouted) {
      // add the bottommost point and disconnected icon next to the vapp label
      this._path.add(new paper.Point(0, VAPP_PADDING + LABEL_HEIGHT / 2));
      this.addChild(new SmallConnectorComponent(this._path.bounds.bottomCenter));
    } else {
      // add the bottommost point at the edge label's position
      this.path.add(new paper.Point(0, this.edgeLabel.position.y));
    }
  }

  /**
   * Clones and splits the bottom segment in the VmAndVnicListComponent if scrolling is required.
   * @param splitPositionY vertical position where the network path should be split for cloning and separation
   */
  cloneAndSplit(splitPositionY: number): paper.Path {
    let clone: paper.Path = new paper.Path();
    // disconnected networks (without any attached vnics) would not have a segment in the vm and vnic list component
    if (!this.isDisconnected) {
      // add new point to split the path at the top of the vm list
      this._path.add(new paper.Point(0, splitPositionY));
      const segments = this._path.segments;
      // clone last segment
      clone = new paper.Path.Line({
        from: segments[3].point,
        to: segments[4].point,
        style: DEFAULT_STROKE_STYLE
      });
      clone.position.x = this.position.x;
      // remove the original reference segment
      segments[3].remove();
    }
    return clone;
  }
}
