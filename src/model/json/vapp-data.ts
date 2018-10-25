import { VmDataJson } from './vm-data';
import { VappJson } from 'iland-sdk';
import { VappNetworkJson } from 'iland-sdk';

export interface VappDataJson {
  vapp: VappJson;
  vms: Array<VmDataJson>;
  vappNetworks: Array<VappNetworkJson>;
}
