import { LabelComponent } from './label';
import * as paper from 'paper';

describe('entity label component', () => {

  beforeAll(() => {
    const canvasEl = document.createElement('canvas');
    paper.setup(canvasEl);
    paper.settings.applyMatrix = false;
  });

  test('basic properties', () => {
    const text = 'foobarbaz';
    const position = new paper.Point(0, 0);
    const label = new LabelComponent(text);
    expect(label.position.x).toBe(position.x);
    expect(label.position.y).toBe(position.y);
    expect(label.text.content).toBe(text);
  });

  test('background component', () => {
    const text = 'hello world';
    const position = new paper.Point(2, 448);
    const label = new LabelComponent(text, position);
    const styleOptions = {
      fillColor: new paper.Color('green'),
      strokeWidth: 2,
      strokeColor: new paper.Color('pink')
    };
    label.background.style = styleOptions;
    expect(label.position.x).toBe(position.x);
    expect(label.position.y).toBe(position.y);
    expect(label.text.content).toBe(text);
    expect(label.background.fillColor).toBe(styleOptions.fillColor);
    expect(label.background.strokeWidth).toBe(styleOptions.strokeWidth);
    expect(label.background.strokeColor).toBe(styleOptions.strokeColor);
  });

});
