import { VappComponent, VappData } from './vapp';
import * as paper from 'paper';

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

  test('basic properties', () => {
    const vappData: VappData = {
      uuid: '',
      name: 'Coke RES & BURST',
      vapp_networks: [
        {
          uuid: '0',
          name: 'A',
          vapp_uuid: '',
          fence_mode: 'BRIDGED'
        }
      ],
      vms: [
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
      ]
    };
    const position = new paper.Point(20, 15);
    const vapp = new VappComponent(vappData, position);
    expect(vapp.data.uuid).toBe(vappData.uuid);
    expect(vapp.data.name).toBe(vappData.name);
    expect(vapp.data.vapp_networks).toBe(vappData.vapp_networks);
    expect(vapp.data.vms).toBe(vappData.vms);
    expect(vapp.position.x).toBe(position.x);
    expect(vapp.position.y).toBe(position.y);
  });

});
