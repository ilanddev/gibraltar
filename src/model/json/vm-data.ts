import { VmJson } from 'iland-sdk';
import { VnicJson } from 'iland-sdk';

export interface VmDataJson {
  vm: VmJson;
  vnics: Array<VnicJson>;
}
