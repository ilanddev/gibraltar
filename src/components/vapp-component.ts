import * as paper from 'paper';
import { VmComponent } from './vm-component';
import { VappNetworkComponent } from './vapp-network-component';
import { VappData } from '../model/vapp-data';
import { LabelComponent } from './label-component';
import { VappNetwork } from 'iland-sdk';
import { VappPowerStatus } from 'iland-sdk';
import { VnicNetConnectionComponent } from './vnic-net-connection-component';
import { POWER_MIXED_COLOR, POWERED_OFF_COLOR, POWERED_ON_COLOR, VAPP_BACKGROUND_COLOR } from '../constants/colors';
import { LABEL_HEIGHT, VAPP_BACKGROUND_PADDING } from '../constants/dimensions';

const FIRST_VM_OFFSET = 350;
const VM_MARGIN_TOP = 30;
const VM_SPACING = 30;
const FIRST_VAPP_NETWORK_OFFSET = 120;
const VAPP_NETWORK_SPACING = 60;
const VAPP_LABEL_OFFSET = 100;
const DEFAULT_UNCONNECTED_NET_LENGTH = 100;

/**
 * Virtual Application Visual Component.
 */
export class VappComponent extends paper.Group {

  private _vmComponents: Array<VmComponent> = [];
  private _vappNetworkComponents: Array<VappNetworkComponent> = [];
  private _vnicConnections: Array<VnicNetConnectionComponent> = [];

  private _label: LabelComponent;
  private _background: paper.Path.Rectangle;

  constructor(private _vapp: VappData, private _point: paper.Point = new paper.Point(0, 0)) {
    super();
    this.applyMatrix = false;
    this.pivot = new paper.Point(0, 0);
    this.position = _point;
    this._label = new LabelComponent(this._vapp.getVapp().name, undefined,
        this.getColorForVappStatus(this._vapp.getVapp().powerStatus));
    this.addChild(this._label);
    let idx = 0;
    for (const vm of _vapp.getVmsData()) {
      const x = idx === 0 ? FIRST_VM_OFFSET :
          this._vmComponents[this._vmComponents.length - 1].bounds.right + VM_SPACING;
      const vmComponent = new VmComponent(vm, new paper.Point(x, VM_MARGIN_TOP));
      this.addChild(vmComponent);
      this._vmComponents.push(vmComponent);
      idx++;
    }
    let netIdx = 0;
    for (const vappNetwork of _vapp.getVappNetworks()) {
      const vappNetworkComponent = new VappNetworkComponent(vappNetwork,
          new paper.Point(0, FIRST_VAPP_NETWORK_OFFSET + (netIdx * VAPP_NETWORK_SPACING)),
          this.getNetworkEndCoord(vappNetwork));
      this.addChild(vappNetworkComponent);
      for (const vm of this._vmComponents) {
        for (const vnic of vm.getVnicComponents()) {
          if (vnic.getVnic().connectedNetworkName === vappNetwork.name) {
            const pos = this.globalToLocal(vm.localToGlobal(vnic.bounds.bottomCenter));
            const vnicCnx = new VnicNetConnectionComponent(vnic, vappNetworkComponent, pos);
            this._vnicConnections.push(vnicCnx);
            this.addChild(vnicCnx);
          }
        }
      }
      this._vappNetworkComponents.push(vappNetworkComponent);
      netIdx++;
    }
    this._background = new paper.Path.Rectangle({
      rectangle: this.bounds
    });
    this._background.bounds.height = this._background.bounds.height + VAPP_BACKGROUND_PADDING;
    this._background.bounds.width = this._background.bounds.width + VAPP_BACKGROUND_PADDING;
    this._background.fillColor = VAPP_BACKGROUND_COLOR;
    this.addChild(this._background);
    this._background.sendToBack();
    this._label.pivot = new paper.Point(0, 0);
    this._label.position = new paper.Point(VAPP_LABEL_OFFSET, -(LABEL_HEIGHT / 2));
    this.onMouseEnter = this.mouseEnter;
    this.onMouseLeave = this.mouseLeave;
  }

  /**
   * Gets the child VM components.
   * @returns {Array<VmComponent>}
   */
  getVmComponents(): Array<VmComponent> {
    return this._vmComponents;
  }

  /**
   * Gets the child vApp network components.
   * @returns {Array<VappNetworkComponent>}
   */
  getVappNetworkComponents(): Array<VappNetworkComponent> {
    return this._vappNetworkComponents;
  }

  /**
   * Gets the vApp data.
   * @returns {VappData} vApp data
   */
  getVappData(): VappData {
    return this._vapp;
  }

  /**
   * Get the background rectangle.
   * @returns {paper.Path.Rectangle}
   */
  getBackground(): paper.Path.Rectangle {
    return this._background;
  }

  private mouseEnter(event: paper.MouseEvent): void {
    this._label.setHover();
  }

  private mouseLeave(event: paper.MouseEvent): void {
    this._label.setNormal();
  }

  private getColorForVappStatus(status: VappPowerStatus): string {
    switch (status) {
      case 'FAILED_CREATION':
      case 'INCONSISTENT_STATE':
      case 'POWERED_OFF':
      case 'UNRECOGNIZED':
      case 'UNRESOLVED':
      case 'UNKNOWN':
        return POWERED_OFF_COLOR;
      case 'POWERED_ON':
        return POWERED_ON_COLOR;
      case 'SUSPENDED':
      case 'PARTIALLY_POWERED_OFF':
      case 'WAITING_FOR_INPUT':
      case 'MIXED':
      case 'RESOLVED':
        return POWER_MIXED_COLOR;
    }
  }

  private getNetworkEndCoord(net: VappNetwork): number {
    for (let vm of this._vmComponents.slice(0).reverse()) {
      if (vm.getVnicComponents().length > 0) {
        const connectedVnics = vm.getVnicComponents()
                                 .filter(v => v.getVnic().connectedNetworkName === net.name);
        if (connectedVnics.length > 0) {
          return this.globalToLocal(vm.localToGlobal(connectedVnics[connectedVnics.length - 1].bounds.center)).x;
        }
      }
    }
    return DEFAULT_UNCONNECTED_NET_LENGTH;
  }

}
