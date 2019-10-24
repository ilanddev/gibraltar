import { BulletPointConnectionIconComponent } from './bullet-point-connection-icon';
import * as paper from 'paper';

describe('bullet point connection icon component', () => {

  beforeAll(() => {
    const canvasEl = document.createElement('canvas');
    paper.setup(canvasEl);
    paper.settings.applyMatrix = false;
  });

  test('basic properties', () => {
    const position = new paper.Point(0, 0);
    const connector = new BulletPointConnectionIconComponent();
    expect(connector.position.x).toBe(position.x);
    expect(connector.position.y).toBe(position.y);
  });

  test('custom position', () => {
    const position = new paper.Point(42, -10);
    const connector = new BulletPointConnectionIconComponent(position);
    expect(connector.position.x).toBe(position.x);
    expect(connector.position.y).toBe(position.y);
  });

});
