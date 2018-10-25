import { VmDataJson } from './json/vm-data';
import { Vm } from 'iland-sdk';
import { Vnic } from 'iland-sdk';

export class VmData {

  constructor(private _vm: Vm, private _vnics: Array<Vnic>) {}

  static fromJson(json: VmDataJson): VmData {
    return new VmData(new Vm(json.vm), json.vnics.map(v => new Vnic(v)));
  }

  getVm(): Vm {
    return this._vm;
  }

  getVnics(): Array<Vnic> {
    return this._vnics;
  }

  toJsonObject(): VmDataJson {
    return {
      vm: this._vm.json,
      vnics: this._vnics.map(v => v.json)
    };
  }

  toJsonString(): string {
    return JSON.stringify(this.toJsonObject());
  }

}
