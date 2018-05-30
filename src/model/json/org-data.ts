import { EdgeJson, InternalNetworkJson, OrgJson } from 'iland-sdk';
import { VappDataJson } from './vapp-data';

export interface OrgDataJson {
  org: OrgJson;
  edges: Array<EdgeJson>;
  internalNetworks: Array<InternalNetworkJson>;
  vapps: Array<VappDataJson>;
}
