import { ConnectionIconComponent } from './connection-icon';
import { VAPP_BACKGROUND_COLOR, CANVAS_BACKGROUND_COLOR } from '../constants/colors';
import * as paper from 'paper';

describe('connection icon component', () => {

  beforeAll(() => {
    const canvasEl = document.createElement('canvas');
    paper.setup(canvasEl);
    paper.settings.applyMatrix = false;
  });

  test('basic properties', () => {
    const position = new paper.Point(0, 0);
    const defaultColor = new paper.Color(VAPP_BACKGROUND_COLOR);
    const connector = new ConnectionIconComponent();
    expect(connector.position.x).toBe(position.x);
    expect(connector.position.y).toBe(position.y);
    expect((connector.icon.fillColor as paper.Color).equals(defaultColor)).toBe(true);
  });

  test('custom position and fill color', () => {
    const position = new paper.Point(-20, 30);
    const color = new paper.Color(CANVAS_BACKGROUND_COLOR);
    const connector = new ConnectionIconComponent(position, color);
    expect(connector.position.x).toBe(position.x);
    expect(connector.position.y).toBe(position.y);
    expect((connector.icon.fillColor as paper.Color).equals(color)).toBe(true);
  });

});
