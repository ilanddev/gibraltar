import { VappNetworkComponent, VappNetworkData } from './vapp-network';
import * as paper from 'paper';
import { CONNECTOR_RADIUS, VAPP_PADDING, LABEL_HEIGHT } from '../constants/dimensions';

describe('vapp component', () => {

  beforeAll(() => {
    const canvasEl = document.createElement('canvas');
    paper.setup(canvasEl);
  });

  test('basic properties', () => {
    const vappNetworkData: VappNetworkData = {
      uuid: '0',
      name: 'A',
      vapp_uuid: '',
      fence_mode: 'BRIDGED'
    };
    const position = new paper.Point(0, 0);
    const network = new VappNetworkComponent(vappNetworkData);
    expect(network.data.uuid).toBe(vappNetworkData.uuid);
    expect(network.data.name).toBe(vappNetworkData.name);
    expect(network.data.vapp_uuid).toBe(vappNetworkData.vapp_uuid);
    expect(network.data.fence_mode).toBe(vappNetworkData.fence_mode);
    expect(network.position.x).toBe(position.x);
    expect(network.position.y).toBe(position.y);
    expect(network.children.length).toBe(1); // path only
  });

  test('nat-routed topmost segment', () => {
    const vappNetworkData: VappNetworkData = {
      uuid: '0',
      name: 'A',
      vapp_uuid: '',
      fence_mode: 'NAT_ROUTED'
    };
    const edgeCount = 0;
    const topmostPointY = 20;
    const position = new paper.Point(40, 50);
    const isolatedCount = 0;
    const network = new VappNetworkComponent(vappNetworkData, position, edgeCount, topmostPointY);
    network.setTopmostSegmentAndConnection(isolatedCount);
    expect(network.children.length).toBe(3); // path, edge label, and connection
    expect(network.path.bounds.top).toBe(-(topmostPointY + CONNECTOR_RADIUS));
  });

  test('isolated topmost segment', () => {
    const vappNetworkData: VappNetworkData = {
      uuid: '0',
      name: 'A',
      vapp_uuid: '',
      fence_mode: 'ISOLATED'
    };
    const position = new paper.Point(0, 0);
    const isolatedCount = 1;
    const network = new VappNetworkComponent(vappNetworkData, position);
    network.setTopmostSegmentAndConnection(isolatedCount);
    expect(network.children.length).toBe(2); // path and connection
    // (CONNECTOR_RADIUS + MULTIPLE_ISOLATED_NETWORK_PADDING) * isolatedCount + ISOLATED_NETWORK_PADDING ~ 11/2 + 13 + 5
    expect(network.path.bounds.top).toBe(-23.5);
  });

  test('setBottommostSegment method', () => {
    const vappNetworkData: VappNetworkData = {
      uuid: '0',
      name: 'A',
      vapp_uuid: '',
      fence_mode: 'ISOLATED'
    };
    const pointY = 20;
    const network = new VappNetworkComponent(vappNetworkData);
    network.setBottommostSegment(pointY);
    expect(network.children.length).toBe(1); // path only
    expect(network.path.bounds.bottom).toBe(pointY);
  });

  test('setDisconnected method', () => {
    const vappNetworkData: VappNetworkData = {
      uuid: '0',
      name: 'A',
      vapp_uuid: '',
      fence_mode: 'ISOLATED'
    };
    const network = new VappNetworkComponent(vappNetworkData);
    network.setDisconnected();
    expect(network.children.length).toBe(2); // path and small connector component
    expect(network.path.bounds.bottom).toBe(VAPP_PADDING + LABEL_HEIGHT / 2);
  });

  test('cloneAndSplit method', () => {
    const vappNetworkData: VappNetworkData = {
      uuid: '0',
      name: 'A',
      vapp_uuid: '',
      fence_mode: 'BRIDGED'
    };
    const position = new paper.Point(85, 10);
    const network = new VappNetworkComponent(vappNetworkData, position);
    const length = 100;
    const split = 50;
    network.setTopmostSegmentAndConnection(0);
    network.setBottommostSegment(length);
    const initialSegmentCount = network.path.segments.length;
    const clone = network.cloneAndSplit(split);
    expect(network.path.segments.length).toBe(initialSegmentCount); // a segment was added and a segment was removed
    expect(clone.length).toBe(length - split);
    expect(clone.position.x).toBe(network.path.position.x + position.x);
  });

});
