import * as paper from 'paper';
import { VmData, VmComponent } from './vm';
import { VnicComponent } from './vnic';
import { CONNECTOR_RADIUS, CONNECTOR_SIZE, CONNECTOR_RIGHT_MARGIN, DEFAULT_STROKE_WIDTH, LABEL_HEIGHT,
  VM_MARGIN_VERTICAL } from '../constants/dimensions';
import { VappNetworkPositionsByName } from './vapp-network-list';

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

  /**
   * Creates a new VmAndVnicListComponent instance.
   *
   * @param _vms the vms data
   * @param vappNetworkPositionsByName the vapp network positions by name from the VappNetworkListComponent used for
   * positioning x value of matching vnics
   * @param lastNetworkPosition the position of the last (furthest right) vapp network used for positioning vms and
   * unattached vnics
   * @param _point the location that the vm and vnic list should be rendered at
   */
  constructor(private _vms: Array<VmData>,
              private vappNetworkPositionsByName: VappNetworkPositionsByName = {},
              private lastNetworkPosition: paper.Point = new paper.Point(0, 0),
              private _point: paper.Point = new paper.Point(0, 0)) {
    super();
    this.pivot = new paper.Point(0, 0);
    this.position = _point;

    // reusable values
    const hasVappNetworks = Object.keys(this.vappNetworkPositionsByName).length !== 0;
    // middle of vm label
    const vnicOffsetY = LABEL_HEIGHT / 2;
    // offset from vnic pivot in the center to the left stroke bounds
    const vnicOffsetX = CONNECTOR_RADIUS - DEFAULT_STROKE_WIDTH;

    // draw vms and their vnics
    this._vms.forEach((vmData, index) => {
      const sharedPointY = (LABEL_HEIGHT + VM_MARGIN_VERTICAL) * index;
      let xPositionMultiplier = hasVappNetworks ? 1 : 0;

      vmData.vnics.forEach(vnicData => {
        const matchingNetwork = this.vappNetworkPositionsByName[vnicData.network_name];
        const vnicPointX = matchingNetwork ? matchingNetwork.x : this.getPointX(xPositionMultiplier);
        const vnic = new VnicComponent(
          vnicData,
          new paper.Point(vnicPointX + vnicOffsetX, sharedPointY + vnicOffsetY));
        this.addChild(vnic);
        this._lowestVnicPointByNetworkName[vnicData.network_name] = this.localToGlobal(vnic.position);
        if (!matchingNetwork) {
          xPositionMultiplier++;
        }
      });

      const vm = new VmComponent(
        vmData,
        new paper.Point(this.getPointX(xPositionMultiplier), sharedPointY),
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
   * Calculates x position for VMs and unattached VNICs.
   * @param multiplier amount to stagger horizontal position by.
   */
  private getPointX(multiplier: number): number {
    // multiply by the size of the vnic icon including margin and stroke
    return multiplier * (CONNECTOR_SIZE + CONNECTOR_RIGHT_MARGIN + DEFAULT_STROKE_WIDTH * 2)
      + this.lastNetworkPosition.x;
  }
}
