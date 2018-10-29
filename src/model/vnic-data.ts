import { Vnic } from 'iland-sdk';
import { VnicDataJson } from './json/vnic-data';

export class VnicData {

  constructor(private _vnic: Vnic, private _vmUuid: string) {}

  static fromJson(json: VnicDataJson): VnicData {
    return new VnicData(new Vnic(json.vnic), json.vmUuid);
  }

  getVnic(): Vnic {
    return this._vnic;
  }

  getVmUuid(): string {
    return this._vmUuid;
  }

  toJsonObject(): VnicDataJson {
    return {
      vnic: this._vnic.json,
      vmUuid: this._vmUuid
    };
  }

  toJsonString(): string {
    return JSON.stringify(this.toJsonObject());
  }

}
