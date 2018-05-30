import { InternalNetwork, Vapp, VappNetwork } from 'iland-sdk';
import { VmData } from './vm-data';
import { VappDataJson } from './json/vapp-data';

export class VappData {

  constructor(private _vapp: Vapp, private _vms: Array<VmData>, private _vappNetworks: Array<VappNetwork>) {}

  static fromJson(json: VappDataJson): VappData {
    return new VappData(new Vapp(json.vapp), json.vms.map(v => VmData.fromJson(v)),
        json.vappNetworks.map(n => new VappNetwork(n)));
  }

  getVapp(): Vapp {
    return this._vapp;
  }

  getVmsData(): Array<VmData> {
    return this._vms;
  }

  getVappNetworks(): Array<VappNetwork> {
    return this._vappNetworks;
  }

  /**
   * Indicates whether any vApp networks within this vApp are connected to the specified internal network.
   * @param {InternalNetwork} internalNet the internal network to test
   * @returns {boolean} value
   */
  isConnectedToInternalNetwork(internalNet: InternalNetwork): boolean {
    return this._vappNetworks.some((n) => n.getParentNetworkUuid() === internalNet.getUuid());
  }

  toJsonObject(): VappDataJson {
    return {
      vapp: this._vapp.getJson(),
      vms: this._vms.map(v => v.toJsonObject()),
      vappNetworks: this._vappNetworks.map(v => v.getJson())
    };
  }

  toJsonString(): string {
    return JSON.stringify(this.toJsonObject());
  }

}
