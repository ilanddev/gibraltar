import * as paper from 'paper';
import { VmData, VmComponent } from './vm';
import { VnicComponent } from './vnic';
import { CONNECTOR_RADIUS, CONNECTOR_SIZE, CONNECTOR_RIGHT_PADDING, DEFAULT_STROKE_WIDTH, VAPP_NETWORK_RIGHT_MARGIN,
  LABEL_HEIGHT, VM_MARGIN_VERTICAL } from '../constants/dimensions';
import { VappNetworkPositionsByName } from './vapp-network-list';

const VAPP_NETWORK_PADDING_RIGHT = 4.5;

/**
 * Interface for the lowest vnic point by network name.
 */
export interface LowestVnicPointByNetworkName {
  [name: string]: paper.Point;
}

/**
 * Vm List Visual Component.
 */
export class VmAndVnicListComponent extends paper.Group {

  // store lowest vnic point by network name for setting the lowest point of the vapp network path
  private _lowestVnicPointByNetworkName: LowestVnicPointByNetworkName = {};
  // x position of the last (furthest right) network in vapp network list used for positioning vms and vnics
  readonly lastNetworkPositionX: number = 0;

  /**
   * Creates a new VmAndVnicListComponent instance.
   *
   * @param _vms the vms data
   * @param vappNetworkPositionsByName the vapp network positions by name from the VappNetworkListComponent for
   * positioning x value of matching vnics
   * @param _point the location that the vm and vnic list should be rendered at
   */
  constructor(private _vms: Array<VmData>,
              private vappNetworkPositionsByName: VappNetworkPositionsByName = {},
              private _point: paper.Point = new paper.Point(0, 0)) {
    super();
    this.applyMatrix = false;
    this.pivot = new paper.Point(0, 0);
    this.position = _point;

    // reusable calculations
    const vappNetworkCount = Object.keys(this.vappNetworkPositionsByName).length;
    this.lastNetworkPositionX = vappNetworkCount && (vappNetworkCount - 1) * VAPP_NETWORK_RIGHT_MARGIN
      + CONNECTOR_RADIUS - DEFAULT_STROKE_WIDTH;
    const vnicOffsetX = vappNetworkCount
      ? CONNECTOR_SIZE + CONNECTOR_RIGHT_PADDING + DEFAULT_STROKE_WIDTH * 2
      : VAPP_NETWORK_PADDING_RIGHT;
    const vnicOffsetY = LABEL_HEIGHT / 2 + VM_MARGIN_VERTICAL;
    const vmOffsetX = CONNECTOR_RADIUS + CONNECTOR_RIGHT_PADDING + DEFAULT_STROKE_WIDTH * 2;

    // draw vms and their vnics
    this._vms.forEach((vmData, index) => {
      const pointY = (LABEL_HEIGHT + VM_MARGIN_VERTICAL) * index;
      vmData.vnics.forEach(vnicData => {
        const vnic = new VnicComponent(
          vnicData,
          new paper.Point(this.getVnicPointX(vnicData.network_name, vnicOffsetX), pointY + vnicOffsetY));
        this.addChild(vnic);
        this._lowestVnicPointByNetworkName[vnicData.network_name] = this.localToGlobal(vnic.position);
      });
      const vm = new VmComponent(
        vmData,
        new paper.Point(this.getVmPointX(vmOffsetX),pointY + VM_MARGIN_VERTICAL),
        true);
      this.addChild(vm);
    });
  }

  /**
   * Gets array of VM data.
   */
  get data(): VmData[] {
    return this._vms;
  }

  /**
   * Gets the lowestVnicPointByNetworkName data.
   */
  get lowestVnicPointByNetworkName(): LowestVnicPointByNetworkName {
    return this._lowestVnicPointByNetworkName;
  }

  /**
   * Calculates VNIC's x position based on if it's attached or unattached to a network and items drawn to the left
   * of it.
   * @param name the name of the vApp network that the VNIC is attached to
   * @param offsetX the extra offset added to x position value
   */
  private getVnicPointX(name: string, offsetX: number): number {
    const pathPosition = this.vappNetworkPositionsByName && this.vappNetworkPositionsByName[name];
    if (pathPosition) {
      // position is based on matching vapp network path
      return pathPosition.x + VAPP_NETWORK_PADDING_RIGHT;
    } else {
      // position is based on the item (vnic or vapp network path) that is located furthest to right
      const lastChildPositionX = this.lastChild && this.lastChild.position.x;
      return Math.max(lastChildPositionX, this.lastNetworkPositionX) + offsetX;
    }
  }

  /**
   * Calculate's VM's x position based on the item (vnic or vapp network path) drawn to the left of it.
   * @param offsetX the extra offset added to x position value
   */
  private getVmPointX(offsetX: number): number {
    const lastVnicAndOffsetX = (this.lastChild instanceof VnicComponent) ? this.lastChild.position.x + offsetX : 0;
    const lastNetworkAndOffsetX = this.lastNetworkPositionX && this.lastNetworkPositionX + offsetX;
    // position is based on the item (vnic or vapp network path) that is located furthest to the right
    return Math.max(lastVnicAndOffsetX, lastNetworkAndOffsetX);
  }
}
