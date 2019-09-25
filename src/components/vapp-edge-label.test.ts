import { VappEdgeLabelComponent } from './vapp-edge-label';
import * as paper from 'paper';

describe('vapp edge label component', () => {

  beforeAll(() => {
    const canvasEl = document.createElement('canvas');
    paper.setup(canvasEl);
  });

  test('basic properties', () => {
    const text = 'test name';
    const position = new paper.Point(35, 80);
    const label = new VappEdgeLabelComponent(text, position);
    expect(label.text).toBe(text);
    expect(label.position.x).toBe(position.x);
    expect(label.position.y).toBe(position.y);
  });

});
