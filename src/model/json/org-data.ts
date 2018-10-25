import { VappDataJson } from './vapp-data';
import { OrgJson } from 'iland-sdk';
import { EdgeJson } from 'iland-sdk';
import { InternalNetworkJson } from 'iland-sdk';

export interface OrgDataJson {
  org: OrgJson;
  edges: Array<EdgeJson>;
  internalNetworks: Array<InternalNetworkJson>;
  vapps: Array<VappDataJson>;
}
