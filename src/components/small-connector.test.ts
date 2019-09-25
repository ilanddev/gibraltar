import { SmallConnectorComponent } from './small-connector';
import * as paper from 'paper';

describe('small connector component', () => {

  beforeAll(() => {
    const canvasEl = document.createElement('canvas');
    paper.setup(canvasEl);
  });

  test('basic properties', () => {
    const position = new paper.Point(0, 0);
    const connector = new SmallConnectorComponent();
    expect(connector.position.x).toBe(position.x);
    expect(connector.position.y).toBe(position.y);
  });

  test('custom position', () => {
    const position = new paper.Point(42, -10);
    const connector = new SmallConnectorComponent(position);
    expect(connector.position.x).toBe(position.x);
    expect(connector.position.y).toBe(position.y);
  });

});
