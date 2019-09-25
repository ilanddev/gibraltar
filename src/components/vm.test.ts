import { VmComponent, VmData } from './vm';
import * as paper from 'paper';
import { LABEL_HORIZONTAL_PADDING, VM_ICON_SIZE } from '../constants/dimensions';
import { FONT_SIZE, VERTICAL_PADDING_TOP } from './label';

describe('vm component', () => {

  beforeAll(() => {
    const xhrMockClass = () => ({
      open            : jest.fn(),
      send            : jest.fn(),
      setRequestHeader: jest.fn()
    });
    (window as any).XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
  });

  test('basic properties', () => {
    const canvasEl = document.createElement('canvas');
    paper.setup(canvasEl);
    const vmData: VmData = {
      uuid: 'uuid',
      name: 'sandbox.ts',
      vapp_uuid: '',
      operatingSystem: 'asianux3_64Guest',
      vnics: [
        {
          vnic_id: 0,
          network_name: 'A',
          is_connected: true
        }
      ]
    };
    const position = new paper.Point(60, 25);
    const vm = new VmComponent(vmData, position);
    expect(vm.getVmData().uuid).toBe(vmData.uuid);
    expect(vm.getVmData().name).toBe(vmData.name);
    expect(vm.getVmData().vapp_uuid).toBe(vmData.vapp_uuid);
    expect(vm.getVmData().operatingSystem).toBe(vmData.operatingSystem);
    expect(vm.getVmData().vnics).toBe(vmData.vnics);
    expect(vm.position.x).toBe(position.x);
    expect(vm.position.y).toBe(position.y);
    expect(vm.getLabelComponent().getTextComponent().position.x).toBe(LABEL_HORIZONTAL_PADDING + VM_ICON_SIZE);
    expect(vm.getLabelComponent().getTextComponent().position.y).toBe(VERTICAL_PADDING_TOP + FONT_SIZE);
    expect(vm.getLabelComponent().getTextComponent().content).toBe(vmData.name);
  });

});
