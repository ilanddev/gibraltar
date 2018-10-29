import { VmDataJson } from './json/vm-data';
import { Vm } from 'iland-sdk';
import { Vnic } from 'iland-sdk';
import { VnicData } from './vnic-data';

export class VmData {

  constructor(private _vm: Vm, private _vnics: Array<VnicData>) {}

  static fromJson(json: VmDataJson): VmData {
    return new VmData(new Vm(json.vm), json.vnics.map(v => new VnicData(new Vnic(v), json.vm.uuid)));
  }

  getVm(): Vm {
    return this._vm;
  }

  getVnics(): Array<VnicData> {
    return this._vnics;
  }

  toJsonObject(): VmDataJson {
    return {
      vm: this._vm.json,
      vnics: this._vnics.map(v => v.getVnic().json)
    };
  }

  toJsonString(): string {
    return JSON.stringify(this.toJsonObject());
  }

}
