import { VappNetworkListComponent } from './vapp-network-list';
import { VappNetworkData } from './vapp-network';
import * as paper from 'paper';

describe('vapp component', () => {

  beforeAll(() => {
    const canvasEl = document.createElement('canvas');
    paper.setup(canvasEl);
  });

  test('basic properties', () => {
    const vappNetworksData: VappNetworkData[] = [
      {
        uuid: '0',
        name: '172.16.55.0 Failover Network 1',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '1',
        name: '172.16.55.0 Failover Network 2',
        vapp_uuid: '',
        fence_mode: 'NAT_ROUTED'
      },
      {
        uuid: '2',
        name: '172.16.55.0 Failover Network 3',
        vapp_uuid: '',
        fence_mode: 'ISOLATED'
      }
    ];
    const position = new paper.Point(0, 0);
    const networks = new VappNetworkListComponent(vappNetworksData);
    vappNetworksData.forEach((data, i) => {
      expect(networks.data[i].uuid).toBe(data.uuid);
      expect(networks.data[i].name).toBe(data.name);
      expect(networks.data[i].vapp_uuid).toBe(data.vapp_uuid);
      expect(networks.data[i].fence_mode).toBe(data.fence_mode);
    });
    expect(networks.position.x).toBe(position.x);
    expect(networks.position.y).toBe(position.y);
    expect(networks.children.length).toBe(3); // 3 paths created from data
  });

  test('with no networks', () => {
    const vappNetworksData: VappNetworkData[] = [];
    const position = new paper.Point(30, 40);
    const networks = new VappNetworkListComponent(vappNetworksData, position);
    vappNetworksData.forEach((data, i) => {
      expect(networks.data[i].uuid).toBe(data.uuid);
      expect(networks.data[i].name).toBe(data.name);
      expect(networks.data[i].vapp_uuid).toBe(data.vapp_uuid);
      expect(networks.data[i].fence_mode).toBe(data.fence_mode);
    });
    expect(networks.position.x).toBe(position.x);
    expect(networks.position.y).toBe(position.y);
    expect(networks.children.length).toBe(0); // no paths
  });

});
