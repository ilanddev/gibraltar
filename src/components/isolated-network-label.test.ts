import { IsolatedNetworkLabelComponent } from './isolated-network-label';
import { DEFAULT_MAX_LABEL_WIDTH } from '../constants/dimensions';
import * as paper from 'paper';

describe('isolated network label component', () => {

  beforeAll(() => {
    const canvasEl = document.createElement('canvas');
    paper.setup(canvasEl);
    paper.settings.applyMatrix = false;
  });

  test('basic properties', () => {
    const text = 'foobar';
    const position = new paper.Point(10, 90);
    const label = new IsolatedNetworkLabelComponent(text, position);
    expect(label.position.x).toBe(position.x);
    expect(label.position.y).toBe(position.y);
    expect(label.label.text.content).toBe(text.toUpperCase());
  });

  test('maxWidth', () => {
    const text = 'really really really really really really really really really really long name';
    const position = new paper.Point(10, 90);
    const label = new IsolatedNetworkLabelComponent(text, position);
    expect(label.position.x).toBe(position.x);
    expect(label.position.y).toBe(position.y);
    expect(label.label.bounds.width).toBeLessThan(DEFAULT_MAX_LABEL_WIDTH);
  });

});
