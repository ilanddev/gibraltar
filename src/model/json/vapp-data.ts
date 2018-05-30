import { VappJson, VappNetworkJson } from 'iland-sdk';
import { VmDataJson } from './vm-data';

export interface VappDataJson {
  vapp: VappJson;
  vms: Array<VmDataJson>;
  vappNetworks: Array<VappNetworkJson>;
}
