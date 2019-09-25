import { MarginComponent } from './margin';
import * as paper from 'paper';

describe('margin component', () => {

  beforeAll(() => {
    const canvasEl = document.createElement('canvas');
    paper.setup(canvasEl);
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

  test('initialized with one value', () => {
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

  test('initialized with two values', () => {
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

  test('initialized with three values', () => {
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

  test('initialized with four values', () => {
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

  test('setValues', () => {
    const content = createContent();
    const originalMarginValue = {
      top: 10,
      right: 20,
      bottom: 15,
      left: 30
    };
    const marginValue = {
      top: 10,
      right: 20,
      bottom: 15,
      left: 30
    };
    const margin = new MarginComponent(content,
      originalMarginValue.top, originalMarginValue.right, originalMarginValue.bottom, originalMarginValue.left);
    margin.setValues(marginValue.top, marginValue.right, marginValue.bottom, marginValue.left);
    expect(margin.bounds.size.height).toBe(content.bounds.height + marginValue.top + marginValue.bottom);
    expect(margin.bounds.size.width).toBe(content.bounds.width + marginValue.right + marginValue.left);
    expect(margin.bounds.top).toBe(content.bounds.top - marginValue.top);
    expect(margin.bounds.right).toBe(content.bounds.right + marginValue.right);
    expect(margin.bounds.bottom).toBe(content.bounds.bottom + marginValue.bottom);
    expect(margin.bounds.left).toBe(content.bounds.left - marginValue.left);
    expect(margin.position.x).toBe(content.position.x - marginValue.left);
    expect(margin.position.y).toBe(content.position.y - marginValue.top);
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
