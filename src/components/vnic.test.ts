import { VnicComponent, VnicData } from './vnic';
import * as paper from 'paper';

describe('vnic component', () => {

  beforeAll(() => {
    const canvasEl = document.createElement('canvas');
    paper.setup(canvasEl);
  });

  test('basic properties', () => {
    const vnicData: VnicData = {
      vnic_id: 0,
      network_name: 'A',
      is_connected: true
    };
    const position = new paper.Point(60, 25);
    const vnic = new VnicComponent(vnicData, position);
    expect(vnic.data.vnic_id).toBe(vnicData.vnic_id);
    expect(vnic.data.network_name).toBe(vnicData.network_name);
    expect(vnic.data.is_connected).toBe(vnicData.is_connected);
    expect(vnic.position.x).toBe(position.x);
    expect(vnic.position.y).toBe(position.y);
    expect(vnic.children.length).toBe(1);
  });

  test('disconnected vnic', () => {
    const vnicData: VnicData = {
      vnic_id: 0,
      network_name: 'A',
      is_connected: false
    };
    const position = new paper.Point(-60, 25);
    const vnic = new VnicComponent(vnicData, position);
    expect(vnic.data.vnic_id).toBe(vnicData.vnic_id);
    expect(vnic.data.network_name).toBe(vnicData.network_name);
    expect(vnic.data.is_connected).toBe(vnicData.is_connected);
    expect(vnic.position.x).toBe(position.x);
    expect(vnic.position.y).toBe(position.y);
    expect(vnic.children.length).toBe(3);
  });

});
