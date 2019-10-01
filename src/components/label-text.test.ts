import { LabelTextComponent } from './label-text';
import * as paper from 'paper';
import { DEFAULT_MAX_LABEL_WIDTH } from '../constants/dimensions';

describe('label text component', () => {

  beforeAll(() => {
    const canvasEl = document.createElement('canvas');
    paper.setup(canvasEl);
    paper.settings.applyMatrix = false;
  });

  test('basic properties', () => {
    const text = 'foobar';
    const position = new paper.Point(0, 0);
    const label = new LabelTextComponent(text);
    expect(label.position.x).toBe(position.x);
    expect(label.position.y).toBe(position.y);
    expect(label.text.content).toBe(text);
  });

  test('textOptions configuration', () => {
    const text = 'old';
    const position = new paper.Point(20, 50);
    const textOptions = {
      fontWeight: 'bold',
      justification: 'right',
      fillColor: new paper.Color('blue'),
      fontSize: 30,
      leading: 35,
      content: 'new'
    };
    const label = new LabelTextComponent(text, position, textOptions);
    expect(label.position.x).toBe(position.x);
    expect(label.position.y).toBe(position.y);
    expect(label.text.content).toBe(textOptions.content);
    expect(label.text.fontWeight).toBe(textOptions.fontWeight);
    expect(label.text.justification).toBe(textOptions.justification);
    expect(label.text.fillColor).toBe(textOptions.fillColor);
    expect(label.text.fontSize).toBe(textOptions.fontSize);
    expect(label.text.leading).toBe(textOptions.leading);
  });

  test('default maxWidth', () => {
    const text = 'suuuuuuuuuuper duuuuuuuuuuper loooooooooooooooooong name';
    const position = new paper.Point(56, 3);
    const label = new LabelTextComponent(text, position, undefined);
    expect(label.position.x).toBe(position.x);
    expect(label.position.y).toBe(position.y);
    expect(label.bounds.width).toBeLessThan(DEFAULT_MAX_LABEL_WIDTH);
  });

  test('custom maxWidth', () => {
    const text = 'suuuuuuuuuuper duuuuuuuuuuper loooooooooooooooooong name';
    const position = new paper.Point(10, 90);
    const textOptions = { fontFamily: 'serif' };
    const maxWidth = 100;
    const label = new LabelTextComponent(text, position, textOptions, maxWidth);
    expect(label.position.x).toBe(position.x);
    expect(label.position.y).toBe(position.y);
    expect(label.text.fontFamily).toBe(textOptions.fontFamily);
    expect(label.bounds.width).toBeLessThan(maxWidth);
  });

});
