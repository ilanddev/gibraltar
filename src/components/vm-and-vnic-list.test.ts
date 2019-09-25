import { VmAndVnicListComponent, LowestVnicPointByNetworkName } from './vm-and-vnic-list';
import { VappNetworkPositionsByName } from './vapp-network-list';
import { VmData } from './vm';
import * as paper from 'paper';
import { LABEL_HEIGHT, VM_MARGIN_VERTICAL } from '../constants/dimensions';

describe('vapp component', () => {

  beforeAll(() => {
    const xhrMockClass = () => ({
      open            : jest.fn(),
      send            : jest.fn(),
      setRequestHeader: jest.fn()
    });
    (window as any).XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
    const canvasEl = document.createElement('canvas');
    paper.setup(canvasEl);
  });

  function getExpectedVnicPoints(vmData: VmData[],
                                 networkPositions: VappNetworkPositionsByName,
                                 position: paper.Point): LowestVnicPointByNetworkName {
    const expectedVnicPoints: LowestVnicPointByNetworkName = {};
    let networkCount = 0;
    vmData.forEach(vm => {
      vm.vnics.forEach(vnic => {
        if (expectedVnicPoints[vnic.network_name]) {
          expectedVnicPoints[vnic.network_name].y += LABEL_HEIGHT + VM_MARGIN_VERTICAL;
        } else {
          expectedVnicPoints[vnic.network_name] =
            new paper.Point(networkPositions[vnic.network_name].x + position.x + 4.5, // 4.5 VAPP_NETWORK_PADDING_RIGHT
              networkCount * (LABEL_HEIGHT + VM_MARGIN_VERTICAL) + LABEL_HEIGHT / 2 + VM_MARGIN_VERTICAL + position.y);
          networkCount++;
        }
      });
    });
    return expectedVnicPoints;
  }

  test.only('basic properties and vnics on different networks', () => {
    const vmsData: VmData[] = [
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'B',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'C',
            is_connected: true
          }
        ]
      }
    ];
    const networkPositions: VappNetworkPositionsByName = {
      A: new paper.Point(0, 30),
      B: new paper.Point(20, 30),
      C: new paper.Point(40, 30)
    };
    const position = new paper.Point(0, 0);
    const vms = new VmAndVnicListComponent(vmsData, networkPositions);
    vmsData.forEach((data, i) => {
      expect(vms.data[i].uuid).toBe(data.uuid);
      expect(vms.data[i].name).toBe(data.name);
      expect(vms.data[i].operatingSystem).toBe(data.operatingSystem);
      expect(vms.data[i].vnics).toBe(data.vnics);
    });
    expect(vms.lowestVnicPointByNetworkName).toEqual(getExpectedVnicPoints(vmsData, networkPositions, position));
    expect(vms.position.y).toBe(position.y);
  });

  test.only('multiple vnics on same network', () => {
    const vmsData: VmData[] = [
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      }
    ];
    const networkPositions: VappNetworkPositionsByName = {
      A: new paper.Point(0, 30)
    };
    const position = new paper.Point(20, 50);
    const vms = new VmAndVnicListComponent(vmsData, networkPositions, position);
    expect(vms.lowestVnicPointByNetworkName).toEqual(getExpectedVnicPoints(vmsData, networkPositions, position));
    expect(vms.position.x).toBe(position.x);
    expect(vms.position.y).toBe(position.y);
  });

  test.only('mix vnics on same network or different network', () => {
    const vmsData: VmData[] = [
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'B',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'B',
            is_connected: true
          }
        ]
      }
    ];
    const networkPositions: VappNetworkPositionsByName = {
      A: new paper.Point(0, 30),
      B: new paper.Point(20, 30)
    };
    const position = new paper.Point(60, 10);
    const vms = new VmAndVnicListComponent(vmsData, networkPositions, position);
    expect(vms.lowestVnicPointByNetworkName).toEqual(getExpectedVnicPoints(vmsData, networkPositions, position));
    expect(vms.position.x).toBe(position.x);
    expect(vms.position.y).toBe(position.y);
  });

});
