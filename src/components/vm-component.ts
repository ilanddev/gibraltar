import * as paper from 'paper';
import { VmData } from '../model/vm-data';
import { VnicComponent } from './vnic-component';
import { IconService } from '../services/icon-service';
import { LabelComponent } from './label-component';
import { IconLabelComponent } from './icon-label-component';
import { VmPowerStatus } from 'iland-sdk';
import { ICON_SIZE, VNIC_SPACING } from '../constants/dimensions';
import { POWER_MIXED_COLOR, POWERED_OFF_COLOR, POWERED_ON_COLOR } from '../constants/colors';

/**
 * Virtual Machine Visual Component.
 */
export class VmComponent extends paper.Group {

  private _label: LabelComponent;
  private _vnicComponents: Array<VnicComponent> = [];

  constructor(private _vm: VmData, private _point: paper.Point = new paper.Point(0, 0)) {
    super();
    const self = this;
    this.applyMatrix = false;
    this.position = _point;
    let idx = 0;
    for (const vnic of _vm.getVnics()) {
      const vnicX = idx * VNIC_SPACING;
      const vnicItem = new VnicComponent(vnic);
      const vnicPoint = new paper.Point(vnicX, ICON_SIZE / 2);
      vnicItem.translate(vnicPoint);
      this.addChild(vnicItem);
      this._vnicComponents.push(vnicItem);
      idx++;
    }
    self._label = new IconLabelComponent(self._vm.getVm().getName(),
        IconService.getOperatingSystemIcon(this._vm.getVm().getOperatingSystem()),
        undefined, self.getColorForVmStatus(self._vm.getVm().getPowerStatus()));
    self._label.position = new paper.Point(_vm.getVnics().length * VNIC_SPACING, 0);
    self.addChild(self._label);
    self.onMouseEnter = self.mouseEnter;
    self.onMouseLeave = self.mouseLeave;
  }

  getVm(): VmData {
    return this._vm;
  }

  getVnicComponents(): Array<VnicComponent> {
    return this._vnicComponents;
  }

  private mouseEnter(event: paper.MouseEvent): void {
    this._label.setHover();
  }

  private mouseLeave(event: paper.MouseEvent): void {
    this._label.setNormal();
  }

  private getColorForVmStatus(status: VmPowerStatus): string {
    switch (status) {
      case 'FAILED_CREATION':
      case 'INCONSISTENT_STATE':
      case 'POWERED_OFF':
      case 'UNRECOGNIZED':
      case 'UNRESOLVED':
        return POWERED_OFF_COLOR;
      case 'POWERED_ON':
        return POWERED_ON_COLOR;
      case 'SUSPENDED':
      case 'PARTIALLY_POWERED_OFF':
      case 'UNKNOWN':
      case 'WAITING_FOR_INPUT':
      case 'MIXED':
        return POWER_MIXED_COLOR;
    }
  }

}
