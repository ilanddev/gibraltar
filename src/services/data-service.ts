import { Org } from 'iland-sdk';
import { OrgData } from '../model/org-data';
import { VmData } from '../model/vm-data';
import { VappData } from '../model/vapp-data';
import { OrgDataJson } from '../model/json/org-data';

export abstract class DataService {

  static async loadOrgData(orgUuid: string): Promise<OrgData> {
    if (localStorage.getItem(orgUuid)) {
      return OrgData.fromJson(JSON.parse(localStorage.getItem(orgUuid)!) as OrgDataJson);
    } else {
      return Org.getOrg(orgUuid).then(async(org) => {
        const promises: Array<Promise<any>> = [];
        const vappNetworksPromise = org.getVappNetworks();
        let vappVmsPromise = org.getVms().then(async(vms) => {
          const vmPromises = [];
          for (const vm of vms) {
            vmPromises.push(vm.getVnics().then(function(vnics) {
              return new VmData(vm, vnics);
            }));
          }
          return Promise.all(vmPromises).then(function(vms) {
            const vappVmMap: Map<string, Array<VmData>> = new Map();
            for (const vm of vms) {
              if (vappVmMap.get(vm.getVm().vappUuid) === undefined) {
                vappVmMap.set(vm.getVm().vappUuid, []);
              }
              vappVmMap.get(vm.getVm().vappUuid)!.push(vm);
            }
            return vappVmMap;
          });
        });
        promises.push(org.getVapps().then(async(vapps) => {
          const vappNetPromises = [];
          for (const vapp of vapps) {
            vappNetPromises.push(vappNetworksPromise.then(function(vappNetworks) {
              return vappVmsPromise.then(function(vappVms) {
                return new VappData(vapp, vappVms.has(vapp.uuid) ? vappVms.get(vapp.uuid)! : [],
                    vappNetworks.filter(v => v.vappUuid === vapp.uuid));
              });
            }));
          }
          return Promise.all(vappNetPromises);
        }));
        promises.push(org.getInternalNetworks());
        promises.push(org.getEdges().then(function(edges) {
          return edges;
        }));
        return Promise.all(promises).then(function(results) {
          const vapps = results[0];
          const internalNetworks = results[1];
          const edges = results[2];
          const orgData = new OrgData(org, edges, internalNetworks, vapps);
          localStorage.setItem(orgUuid, orgData.toJsonString());
          return orgData;
        });
      });
    }
  }

}
