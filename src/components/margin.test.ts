import { MarginComponent, MarginValues } from './margin';
import * as paper from 'paper';

describe('margin component', () => {

  beforeAll(() => {
    const canvasEl = document.createElement('canvas');
    paper.setup(canvasEl);
    paper.settings.applyMatrix = false;
  });

  function createContent() {
    return new paper.Path.Rectangle({
      pivot: new paper.Point(0, 0),
      position: new paper.Point(0, 0),
      size: new paper.Size(100, 100)
    });
  }

  test('basic default properties', () => {
    const content = createContent();
    const margin = new MarginComponent(content);
    expect(margin.bounds.size.height).toBe(content.bounds.height);
    expect(margin.bounds.size.width).toBe(content.bounds.width);
    expect(margin.bounds.top).toBe(content.bounds.top);
    expect(margin.bounds.right).toBe(content.bounds.right);
    expect(margin.bounds.bottom).toBe(content.bounds.bottom);
    expect(margin.bounds.left).toBe(content.bounds.left);
    expect(margin.position.x).toBe(content.position.x);
    expect(margin.position.y).toBe(content.position.y);
  });

  test('initialized with a MarginValues instance', () => {
    const content = createContent();
    const marginValue: MarginValues = {
      top: 5,
      right: 21,
      bottom: 74,
      left: 12
    };
    const margin = new MarginComponent(content, marginValue);
    expect(margin.bounds.size.height).toBe(content.bounds.height + marginValue.top + marginValue.bottom);
    expect(margin.bounds.size.width).toBe(content.bounds.width + marginValue.right + marginValue.left);
    expect(margin.bounds.top).toBe(content.bounds.top - marginValue.top);
    expect(margin.bounds.right).toBe(content.bounds.right + marginValue.right);
    expect(margin.bounds.bottom).toBe(content.bounds.bottom + marginValue.bottom);
    expect(margin.bounds.left).toBe(content.bounds.left - marginValue.left);
    expect(margin.position.x).toBe(content.position.x - marginValue.left);
    expect(margin.position.y).toBe(content.position.y - marginValue.top);
  });

  test('initialized with a top and left partial MarginValues instance', () => {
    const content = createContent();
    const marginValue: Partial<MarginValues> = {
      top: 25,
      left: 95
    };
    const testValue = marginValue as any; // to avoid object is possibly undefined error
    const margin = new MarginComponent(content, marginValue);
    expect(margin.bounds.size.height).toBe(content.bounds.height + testValue.top);
    expect(margin.bounds.size.width).toBe(content.bounds.width + testValue.left);
    expect(margin.bounds.top).toBe(content.bounds.top - testValue.top);
    expect(margin.bounds.right).toBe(content.bounds.right);
    expect(margin.bounds.bottom).toBe(content.bounds.bottom);
    expect(margin.bounds.left).toBe(content.bounds.left - testValue.left);
    expect(margin.position.x).toBe(content.position.x - testValue.left);
    expect(margin.position.y).toBe(content.position.y - testValue.top);
  });

  test('initialized with a right and bottom partial MarginValues instance', () => {
    const content = createContent();
    const marginValue: Partial<MarginValues> = {
      right: 51,
      bottom: 32
    };
    const testValue = marginValue as any;
    const margin = new MarginComponent(content, marginValue);
    expect(margin.bounds.size.height).toBe(content.bounds.height + testValue.bottom);
    expect(margin.bounds.size.width).toBe(content.bounds.width + testValue.right);
    expect(margin.bounds.top).toBe(content.bounds.top);
    expect(margin.bounds.right).toBe(content.bounds.right + testValue.right);
    expect(margin.bounds.bottom).toBe(content.bounds.bottom + testValue.bottom);
    expect(margin.bounds.left).toBe(content.bounds.left);
    expect(margin.position.x).toBe(content.position.x);
    expect(margin.position.y).toBe(content.position.y);
  });

  test('initialized with four values in css shorthand notation', () => {
    const content = createContent();
    const marginValue = {
      top: 10,
      right: 20,
      bottom: 15,
      left: 30
    };
    const margin = new MarginComponent(
      content, marginValue.top, marginValue.right, marginValue.bottom, marginValue.left);
    expect(margin.bounds.size.height).toBe(content.bounds.height + marginValue.top + marginValue.bottom);
    expect(margin.bounds.size.width).toBe(content.bounds.width + marginValue.right + marginValue.left);
    expect(margin.bounds.top).toBe(content.bounds.top - marginValue.top);
    expect(margin.bounds.right).toBe(content.bounds.right + marginValue.right);
    expect(margin.bounds.bottom).toBe(content.bounds.bottom + marginValue.bottom);
    expect(margin.bounds.left).toBe(content.bounds.left - marginValue.left);
    expect(margin.position.x).toBe(content.position.x - marginValue.left);
    expect(margin.position.y).toBe(content.position.y - marginValue.top);
  });

  test('initialized with one value in css shorthand notation', () => {
    const content = createContent();
    const marginValue = 20;
    const margin = new MarginComponent(content, marginValue);
    expect(margin.bounds.size.height).toBe(content.bounds.height + marginValue * 2);
    expect(margin.bounds.size.width).toBe(content.bounds.width + marginValue * 2);
    expect(margin.bounds.top).toBe(content.bounds.top - marginValue);
    expect(margin.bounds.right).toBe(content.bounds.right + marginValue);
    expect(margin.bounds.bottom).toBe(content.bounds.bottom + marginValue);
    expect(margin.bounds.left).toBe(content.bounds.left - marginValue);
    expect(margin.position.x).toBe(content.position.x - marginValue);
    expect(margin.position.y).toBe(content.position.y - marginValue);
  });

  test('initialized with two values in css shorthand notation', () => {
    const content = createContent();
    const marginValue = {
      vertical: 10,
      horizontal: 20
    };
    const margin = new MarginComponent(content, marginValue.vertical, marginValue.horizontal);
    expect(margin.bounds.size.height).toBe(content.bounds.height + marginValue.vertical * 2);
    expect(margin.bounds.size.width).toBe(content.bounds.width + marginValue.horizontal * 2);
    expect(margin.bounds.top).toBe(content.bounds.top - marginValue.vertical);
    expect(margin.bounds.right).toBe(content.bounds.right + marginValue.horizontal);
    expect(margin.bounds.bottom).toBe(content.bounds.bottom + marginValue.vertical);
    expect(margin.bounds.left).toBe(content.bounds.left - marginValue.horizontal);
    expect(margin.position.x).toBe(content.position.x - marginValue.horizontal);
    expect(margin.position.y).toBe(content.position.y - marginValue.vertical);
  });

  test('initialized with three values in css shorthand notation', () => {
    const content = createContent();
    const marginValue = {
      top: 10,
      horizontal: 20,
      bottom: 15
    };
    const margin = new MarginComponent(content, marginValue.top, marginValue.horizontal, marginValue.bottom);
    expect(margin.bounds.size.height).toBe(content.bounds.height + marginValue.top + marginValue.bottom);
    expect(margin.bounds.size.width).toBe(content.bounds.width + marginValue.horizontal * 2);
    expect(margin.bounds.top).toBe(content.bounds.top - marginValue.top);
    expect(margin.bounds.right).toBe(content.bounds.right + marginValue.horizontal);
    expect(margin.bounds.bottom).toBe(content.bounds.bottom + marginValue.bottom);
    expect(margin.bounds.left).toBe(content.bounds.left - marginValue.horizontal);
    expect(margin.position.x).toBe(content.position.x - marginValue.horizontal);
    expect(margin.position.y).toBe(content.position.y - marginValue.top);
  });

  test('initialized with four values in css shorthand notation', () => {
    const content = createContent();
    const marginValue = {
      top: 10,
      right: 20,
      bottom: 15,
      left: 30
    };
    const margin = new MarginComponent(
      content, marginValue.top, marginValue.right, marginValue.bottom, marginValue.left);
    expect(margin.bounds.size.height).toBe(content.bounds.height + marginValue.top + marginValue.bottom);
    expect(margin.bounds.size.width).toBe(content.bounds.width + marginValue.right + marginValue.left);
    expect(margin.bounds.top).toBe(content.bounds.top - marginValue.top);
    expect(margin.bounds.right).toBe(content.bounds.right + marginValue.right);
    expect(margin.bounds.bottom).toBe(content.bounds.bottom + marginValue.bottom);
    expect(margin.bounds.left).toBe(content.bounds.left - marginValue.left);
    expect(margin.position.x).toBe(content.position.x - marginValue.left);
    expect(margin.position.y).toBe(content.position.y - marginValue.top);
  });

  test('setValues with a MarginValues instance', () => {
    const content = createContent();
    const originalMarginValue = {
      top: 62,
      right: 5,
      bottom: 44,
      left: 67
    };
    const marginValue: MarginValues = {
      top: 7,
      right: 37,
      bottom: 1,
      left: 64
    };
    const deltaTop = marginValue.top - originalMarginValue.top;
    const deltaLeft = marginValue.left - originalMarginValue.left;
    const margin = new MarginComponent(content,
      originalMarginValue.top, originalMarginValue.right, originalMarginValue.bottom, originalMarginValue.left);
    margin.setValues(marginValue);
    expect(margin.bounds.size.height).toBe(content.bounds.height + marginValue.top + marginValue.bottom);
    expect(margin.bounds.size.width).toBe(content.bounds.width + marginValue.right + marginValue.left);
    expect(margin.bounds.top).toBe(content.bounds.top - marginValue.top - deltaTop);
    expect(margin.bounds.right).toBe(content.bounds.right + marginValue.right - deltaLeft);
    expect(margin.bounds.bottom).toBe(content.bounds.bottom + marginValue.bottom - deltaTop);
    expect(margin.bounds.left).toBe(content.bounds.left - marginValue.left - deltaLeft);
    expect(margin.position.x).toBe(content.position.x - marginValue.left - deltaLeft);
    expect(margin.position.y).toBe(content.position.y - marginValue.top - deltaTop);
  });

  test('setValues with a top and left partial MarginValues instance', () => {
    const content = createContent();
    const originalMarginValue = {
      top: 73,
      right: 8,
      bottom: 90,
      left: 42
    };
    const marginValue: Partial<MarginValues> = {
      top: 22,
      left: 51
    };
    const testValue = marginValue as any;
    const deltaTop = testValue.top - originalMarginValue.top;
    const deltaLeft = testValue.left - originalMarginValue.left;
    const margin = new MarginComponent(content,
      originalMarginValue.top, originalMarginValue.right, originalMarginValue.bottom, originalMarginValue.left);
    margin.setValues(marginValue);
    expect(margin.bounds.size.height).toBe(content.bounds.height + testValue.top + originalMarginValue.bottom);
    expect(margin.bounds.size.width).toBe(content.bounds.width + originalMarginValue.right + testValue.left);
    expect(margin.bounds.top).toBe(content.bounds.top - testValue.top - deltaTop);
    expect(margin.bounds.right).toBe(content.bounds.right + originalMarginValue.right - deltaLeft);
    expect(margin.bounds.bottom).toBe(content.bounds.bottom + originalMarginValue.bottom - deltaTop);
    expect(margin.bounds.left).toBe(content.bounds.left - testValue.left - deltaLeft);
    expect(margin.position.x).toBe(content.position.x - testValue.left - deltaLeft);
    expect(margin.position.y).toBe(content.position.y - testValue.top - deltaTop);
  });

  test('setValues with a right and bottom partial MarginValues instance', () => {
    const content = createContent();
    const originalMarginValue = {
      top: 26,
      right: 25,
      bottom: 6,
      left: 2
    };
    const marginValue: Partial<MarginValues> = {
      right: 10,
      bottom: 10
    };
    const testValue = marginValue as any;
    const deltaTop = originalMarginValue.top - originalMarginValue.top;
    const deltaLeft = originalMarginValue.left - originalMarginValue.left;
    const margin = new MarginComponent(content,
      originalMarginValue.top, originalMarginValue.right, originalMarginValue.bottom, originalMarginValue.left);
    margin.setValues(marginValue);
    expect(margin.bounds.size.height).toBe(content.bounds.height + originalMarginValue.top + testValue.bottom);
    expect(margin.bounds.size.width).toBe(content.bounds.width + testValue.right + originalMarginValue.left);
    expect(margin.bounds.top).toBe(content.bounds.top - originalMarginValue.top - deltaTop);
    expect(margin.bounds.right).toBe(content.bounds.right + testValue.right - deltaLeft);
    expect(margin.bounds.bottom).toBe(content.bounds.bottom + testValue.bottom - deltaTop);
    expect(margin.bounds.left).toBe(content.bounds.left - originalMarginValue.left - deltaLeft);
    expect(margin.position.x).toBe(content.position.x - originalMarginValue.left - deltaLeft);
    expect(margin.position.y).toBe(content.position.y - originalMarginValue.top - deltaTop);
  });

  test('setValues with css shorthand notation', () => {
    const content = createContent();
    const originalMarginValue = {
      top: 10,
      right: 20,
      bottom: 15,
      left: 30
    };
    const marginValue = {
      top: 22,
      right: 63,
      bottom: 35,
      left: 3
    };
    const deltaTop = marginValue.top - originalMarginValue.top;
    const deltaLeft = marginValue.left - originalMarginValue.left;
    const margin = new MarginComponent(content,
      originalMarginValue.top, originalMarginValue.right, originalMarginValue.bottom, originalMarginValue.left);
    margin.setValues(marginValue.top, marginValue.right, marginValue.bottom, marginValue.left);
    expect(margin.bounds.size.height).toBe(content.bounds.height + marginValue.top + marginValue.bottom);
    expect(margin.bounds.size.width).toBe(content.bounds.width + marginValue.right + marginValue.left);
    expect(margin.bounds.top).toBe(content.bounds.top - marginValue.top - deltaTop);
    expect(margin.bounds.right).toBe(content.bounds.right + marginValue.right - deltaLeft);
    expect(margin.bounds.bottom).toBe(content.bounds.bottom + marginValue.bottom - deltaTop);
    expect(margin.bounds.left).toBe(content.bounds.left - marginValue.left - deltaLeft);
    expect(margin.position.x).toBe(content.position.x - marginValue.left - deltaLeft);
    expect(margin.position.y).toBe(content.position.y - marginValue.top - deltaTop);
  });

  test('set top', () => {
    const marginValue = {
      top: 10,
      right: 20,
      bottom: 15,
      left: 30
    };
    const newValue = 3;
    const margin = new MarginComponent(
      createContent(), marginValue.top, marginValue.right, marginValue.bottom, marginValue.left);
    margin.top = newValue;
    const content = createContent();
    expect(margin.bounds.size.height).toBe(content.bounds.height + newValue + marginValue.bottom);
    expect(margin.bounds.size.width).toBe(content.bounds.width + marginValue.right + marginValue.left);
    expect(margin.bounds.top).toBe(content.bounds.top - newValue);
    expect(margin.bounds.right).toBe(content.bounds.right + marginValue.right);
    expect(margin.bounds.bottom).toBe(content.bounds.bottom + marginValue.bottom);
    expect(margin.bounds.left).toBe(content.bounds.left - marginValue.left);
    expect(margin.position.x).toBe(content.position.x - marginValue.left);
    expect(margin.position.y).toBe(content.position.y - newValue);
  });

  test('set right', () => {
    const marginValue = {
      top: 10,
      right: 20,
      bottom: 15,
      left: 30
    };
    const newValue = 8;
    const margin = new MarginComponent(
      createContent(), marginValue.top, marginValue.right, marginValue.bottom, marginValue.left);
    margin.right = newValue;
    const content = createContent();
    expect(margin.bounds.size.height).toBe(content.bounds.height + marginValue.top + marginValue.bottom);
    expect(margin.bounds.size.width).toBe(content.bounds.width + newValue + marginValue.left);
    expect(margin.bounds.top).toBe(content.bounds.top - marginValue.top);
    expect(margin.bounds.right).toBe(content.bounds.right + newValue);
    expect(margin.bounds.bottom).toBe(content.bounds.bottom + marginValue.bottom);
    expect(margin.bounds.left).toBe(content.bounds.left - marginValue.left);
    expect(margin.position.x).toBe(content.position.x - marginValue.left);
    expect(margin.position.y).toBe(content.position.y - marginValue.top);
  });

  test('set bottom', () => {
    const marginValue = {
      top: 10,
      right: 20,
      bottom: 15,
      left: 30
    };
    const newValue = 8;
    const margin = new MarginComponent(
      createContent(), marginValue.top, marginValue.right, marginValue.bottom, marginValue.left);
    margin.bottom = newValue;
    const content = createContent();
    expect(margin.bounds.size.height).toBe(content.bounds.height + marginValue.top + newValue);
    expect(margin.bounds.size.width).toBe(content.bounds.width + marginValue.right + marginValue.left);
    expect(margin.bounds.top).toBe(content.bounds.top - marginValue.top);
    expect(margin.bounds.right).toBe(content.bounds.right + marginValue.right);
    expect(margin.bounds.bottom).toBe(content.bounds.bottom + newValue);
    expect(margin.bounds.left).toBe(content.bounds.left - marginValue.left);
    expect(margin.position.x).toBe(content.position.x - marginValue.left);
    expect(margin.position.y).toBe(content.position.y - marginValue.top);
  });

  test('set left', () => {
    const marginValue = {
      top: 10,
      right: 20,
      bottom: 15,
      left: 30
    };
    const newValue = 8;
    const margin = new MarginComponent(
      createContent(), marginValue.top, marginValue.right, marginValue.bottom, marginValue.left);
    margin.left = newValue;
    const content = createContent();
    expect(margin.bounds.size.height).toBe(content.bounds.height + marginValue.top + marginValue.bottom);
    expect(margin.bounds.size.width).toBe(content.bounds.width + marginValue.right + newValue);
    expect(margin.bounds.top).toBe(content.bounds.top - marginValue.top);
    expect(margin.bounds.right).toBe(content.bounds.right + marginValue.right);
    expect(margin.bounds.bottom).toBe(content.bounds.bottom + marginValue.bottom);
    expect(margin.bounds.left).toBe(content.bounds.left - newValue);
    expect(margin.position.x).toBe(content.position.x - newValue);
    expect(margin.position.y).toBe(content.position.y - marginValue.top);
  });

});
