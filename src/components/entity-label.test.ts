import { EntityLabelComponent } from './entity-label';
import * as paper from 'paper';
import { LABEL_HORIZONTAL_PADDING } from '../constants/dimensions';

describe('entity label component', () => {

  beforeAll(() => {
    const canvasEl = document.createElement('canvas');
    paper.setup(canvasEl);
  });

  test('basic properties', () => {
    const text = 'foobar';
    const position = new paper.Point(0, 0);
    const color = new paper.Color('red');
    const label = new EntityLabelComponent(text, color);
    expect(label.position.x).toBe(position.x);
    expect(label.position.y).toBe(position.y);
    expect(label.icon.fillColor).toBe(color);
  });

  test('fontWeight', () => {
    const text = 'foobar';
    const position = new paper.Point(10, 90);
    const color = new paper.Color('blue');
    const fontWeight = 'bold';
    const label = new EntityLabelComponent(text, color, position, fontWeight);
    expect(label.position.x).toBe(position.x);
    expect(label.position.y).toBe(position.y);
    expect(label.icon.fillColor).toBe(color);
    expect(label.getTextComponent().fontWeight).toBe(fontWeight);
    expect(label.bounds.right - LABEL_HORIZONTAL_PADDING)
      .toBe(label.localToGlobal(label.getTextComponent().bounds.bottomRight).x);
  });

});
