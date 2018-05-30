import { VmJson, VnicJson } from 'iland-sdk';

export interface VmDataJson {
  vm: VmJson;
  vnics: Array<VnicJson>;
}
