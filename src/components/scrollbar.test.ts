import * as paper from 'paper';
import { ScrollbarComponent } from './scrollbar';

describe('scrollbar component', () => {

  beforeAll(() => {
    const canvasEl = document.createElement('canvas');
    paper.setup(canvasEl);
  });

  test('basic properties and defaults', () => {
    const scrollable = {
      content: new paper.Path.Rectangle(
        new paper.Point(10, 0),
        new paper.Size(1000, 500)
      ),
      containerBounds: new paper.Rectangle(0, 0, 500, 500)
    };
    const defaultPosition = new paper.Point(0, 0);
    const scrollbar = new ScrollbarComponent(scrollable);
    expect(scrollbar.position.x).toBe(defaultPosition.x);
    expect(scrollbar.position.y).toBe(defaultPosition.y);
    expect(scrollbar.getTrack().position.x).toBe(defaultPosition.x);
    expect(scrollbar.getTrack().position.y).toBe(defaultPosition.y);
    expect(scrollbar.getTrack().bounds.width).toBe(scrollable.containerBounds.width);
    expect(scrollbar.getScrollbar().position.x).toBe(defaultPosition.x);
    expect(scrollbar.getScrollbar().position.y).toBe(defaultPosition.y);
    expect(scrollbar.getScrollbar().bounds.width).toBe(
      (scrollable.containerBounds.width / scrollable.content.bounds.width) * scrollable.containerBounds.width);
  });

  test('basic properties and custom position', () => {
    const scrollable = {
      content: new paper.Path.Rectangle(
        new paper.Point(10, 0),
        new paper.Size(1000, 500)
      ),
      containerBounds: new paper.Rectangle(0, 0, 500, 500)
    };
    const customPosition = new paper.Point(30, 30);
    const defaultPosition = new paper.Point(0, 0);
    const scrollbar = new ScrollbarComponent(scrollable, customPosition);
    expect(scrollbar.position.x).toBe(customPosition.x);
    expect(scrollbar.position.y).toBe(customPosition.y);
    expect(scrollbar.getTrack().position.x).toBe(defaultPosition.x);
    expect(scrollbar.getTrack().position.y).toBe(defaultPosition.y);
    expect(scrollbar.getTrack().bounds.width).toBe(scrollable.containerBounds.width);
    expect(scrollbar.getScrollbar().position.x).toBe(defaultPosition.x);
    expect(scrollbar.getScrollbar().position.y).toBe(defaultPosition.y);
    expect(scrollbar.getScrollbar().bounds.width).toBe(
      (scrollable.containerBounds.width / scrollable.content.bounds.width) * scrollable.containerBounds.width);
  });

  test('basic properties and custom scrollTrackLength', () => {
    const scrollable = {
      content: new paper.Path.Rectangle(
        new paper.Point(10, 0),
        new paper.Size(1000, 500)
      ),
      containerBounds: new paper.Rectangle(0, 0, 500, 500)
    };
    const defaultPosition = new paper.Point(0, 0);
    const customScrollTrackLength = 900;
    const scrollbar = new ScrollbarComponent(scrollable, defaultPosition, customScrollTrackLength);
    expect(scrollbar.position.x).toBe(defaultPosition.x);
    expect(scrollbar.position.y).toBe(defaultPosition.y);
    expect(scrollbar.getTrack().position.x).toBe(defaultPosition.x);
    expect(scrollbar.getTrack().position.y).toBe(defaultPosition.y);
    expect(scrollbar.getTrack().bounds.width).toBe(customScrollTrackLength);
    expect(scrollbar.getScrollbar().position.x).toBe(defaultPosition.x);
    expect(scrollbar.getScrollbar().position.y).toBe(defaultPosition.y);
    expect(scrollbar.getScrollbar().bounds.width).toBe(
      (scrollable.containerBounds.width / scrollable.content.bounds.width) * customScrollTrackLength);
  });

  test('does not build when content fits inside container' , () => {
    const scrollable = {
      content: new paper.Path.Rectangle(
        new paper.Point(0, 0),
        new paper.Size(500, 500)
      ),
      containerBounds: new paper.Rectangle(0, 0, 500, 500)
    };
    const scrollbar = new ScrollbarComponent(scrollable, new paper.Point(0, 0));
    expect(scrollbar.children.length).toBe(0);
  });

  test('builds when content does not fit inside container' , () => {
    const scrollable = {
      content: new paper.Path.Rectangle(
        new paper.Point(0, 0),
        new paper.Size(501, 500)
      ),
      containerBounds: new paper.Rectangle(0, 0, 500, 500)
    };
    const scrollbar = new ScrollbarComponent(scrollable, new paper.Point(0, 0));
    expect(scrollbar.children.length).toBeGreaterThan(0);
  });

  test('does not build when content including offsets do not fit but checkFitWithOffsets is off' , () => {
    const scrollable = {
      content: new paper.Path.Rectangle(
        new paper.Point(0, 0),
        new paper.Size(500, 500)
      ),
      containerBounds: new paper.Rectangle(0, 0, 500, 500),
      contentOffsetStart: 10,
      contentOffsetEnd: 10,
      checkFitWithOffsets: false
    };
    const scrollbar = new ScrollbarComponent(scrollable, new paper.Point(0, 0));
    expect(scrollbar.children.length).toBe(0);
  });

  test('builds when content including offsets do not fit and checkFitWithOffsets is on' , () => {
    const scrollable = {
      content: new paper.Path.Rectangle(
        new paper.Point(0, 0),
        new paper.Size(500, 500)
      ),
      containerBounds: new paper.Rectangle(0, 0, 500, 500),
      contentOffsetStart: 10,
      contentOffsetEnd: 10,
      checkFitWithOffsets: true
    };
    const scrollbar = new ScrollbarComponent(scrollable, new paper.Point(0, 0));
    expect(scrollbar.children.length).toBeGreaterThan(0);
  });

  test('getScrollbar returns child scrollbar when component is enabled' , () => {
    const scrollable = {
      content: new paper.Path.Rectangle(
        new paper.Point(0, 0),
        new paper.Size(1000, 500)
      ),
      containerBounds: new paper.Rectangle(0, 0, 500, 500)
    };
    const scrollbar = new ScrollbarComponent(scrollable, new paper.Point(0, 0));
    const scrollbarClass = paper.Path;
    expect(scrollbar.getScrollbar()).toBeInstanceOf(scrollbarClass);
    expect(scrollbar.getScrollbar().parent).toBeInstanceOf(ScrollbarComponent);
  });

  test('getScrollbar returns scrollbar that\'s not a child when component is disabled' , () => {
    const scrollable = {
      content: new paper.Path.Rectangle(
        new paper.Point(0, 0),
        new paper.Size(500, 500)
      ),
      containerBounds: new paper.Rectangle(0, 0, 500, 500)
    };
    const scrollbar = new ScrollbarComponent(scrollable, new paper.Point(0, 0));
    const scrollbarClass = paper.Path;
    expect(scrollbar.getScrollbar()).toBeInstanceOf(scrollbarClass);
    expect(scrollbar.getScrollbar().parent).toBeNull();
  });

  test('getScrollbar allows changes to scrollbar attributes' , () => {
    const scrollable = {
      content: new paper.Path.Rectangle(
        new paper.Point(0, 0),
        new paper.Size(500, 500)
      ),
      containerBounds: new paper.Rectangle(0, 0, 500, 500)
    };
    const scrollbar = new ScrollbarComponent(scrollable, new paper.Point(0, 0));
    const newStyle = {
      fillColor: new paper.Color('red'),
      strokeColor: new paper.Color('white'),
      strokeWidth: 1
    };
    scrollbar.getScrollbar().style = newStyle;
    expect(scrollbar.getScrollbar().fillColor).toBe(newStyle.fillColor);
    expect(scrollbar.getScrollbar().strokeColor).toBe(newStyle.strokeColor);
    expect(scrollbar.getScrollbar().strokeWidth).toBe(newStyle.strokeWidth);
  });

  test('setScrollbar allows fuller changes to scrollbar' , () => {
    const scrollable = {
      content: new paper.Path.Rectangle(
        new paper.Point(0, 0),
        new paper.Size(500, 500)
      ),
      containerBounds: new paper.Rectangle(0, 0, 500, 500)
    };
    const scrollbar = new ScrollbarComponent(scrollable, new paper.Point(0, 0));
    const customScrollbar = new paper.Path.Circle({
      point: new paper.Point(20, 20),
      size: new paper.Size(15, 15),
      pivot: new paper.Point(0, 0),
      fillColor: new paper.Color('red')
    });
    scrollbar.setScrollbar(customScrollbar);
    expect(scrollbar.getScrollbar().bounds.point.x).toBe(customScrollbar.bounds.point.x);
    expect(scrollbar.getScrollbar().bounds.point.y).toBe(customScrollbar.bounds.point.y);
    expect(scrollbar.getScrollbar().bounds.size.width).toBe(customScrollbar.bounds.size.width);
    expect(scrollbar.getScrollbar().bounds.size.height).toBe(customScrollbar.bounds.size.height);
    expect(scrollbar.getScrollbar().pivot.x).toBe(customScrollbar.pivot.x);
    expect(scrollbar.getScrollbar().pivot.y).toBe(customScrollbar.pivot.y);
    expect((scrollbar.getScrollbar().fillColor as paper.Color)
      .equals(customScrollbar.fillColor as paper.Color)).toBe(true);
  });

  test('getTrack returns child track when component is enabled' , () => {
    const scrollable = {
      content: new paper.Path.Rectangle(
        new paper.Point(0, 0),
        new paper.Size(501, 500)
      ),
      containerBounds: new paper.Rectangle(0, 0, 500, 500)
    };
    const scrollbar = new ScrollbarComponent(scrollable, new paper.Point(0, 0));
    const scrollbarClass = paper.Path;
    expect(scrollbar.getTrack()).toBeInstanceOf(scrollbarClass);
    expect(scrollbar.getTrack().parent).toBeInstanceOf(ScrollbarComponent);
  });

  test('getTrack returns track that\'s not a child when component is disabled' , () => {
    const scrollable = {
      content: new paper.Path.Rectangle(
        new paper.Point(0, 0),
        new paper.Size(500, 500)
      ),
      containerBounds: new paper.Rectangle(0, 0, 500, 500)
    };
    const scrollbar = new ScrollbarComponent(scrollable, new paper.Point(0, 0));
    const trackClass = paper.Path;
    expect(scrollbar.getTrack()).toBeInstanceOf(trackClass);
    expect(scrollbar.getTrack().parent).toBeNull();
  });

  test('getTrack allows changes to track attributes' , () => {
    const scrollable = {
      content: new paper.Path.Rectangle(
        new paper.Point(0, 0),
        new paper.Size(500, 500)
      ),
      containerBounds: new paper.Rectangle(0, 0, 500, 500)
    };
    const scrollbar = new ScrollbarComponent(scrollable, new paper.Point(0, 0));
    const newStyle = {
      fillColor: new paper.Color('red'),
      strokeColor: new paper.Color('white'),
      strokeWidth: 1
    };
    scrollbar.getTrack().style = newStyle;
    expect(scrollbar.getTrack().fillColor).toBe(newStyle.fillColor);
    expect(scrollbar.getTrack().strokeColor).toBe(newStyle.strokeColor);
    expect(scrollbar.getTrack().strokeWidth).toBe(newStyle.strokeWidth);
  });

  test('setTrack allows fuller changes to track' , () => {
    const scrollable = {
      content: new paper.Path.Rectangle(
        new paper.Point(0, 0),
        new paper.Size(500, 500)
      ),
      containerBounds: new paper.Rectangle(0, 0, 500, 500)
    };
    const scrollbar = new ScrollbarComponent(scrollable, new paper.Point(0, 0));
    const customTrack = new paper.Path.Rectangle({
      point: new paper.Point(20, 20),
      size: new paper.Size(600, 10),
      pivot: new paper.Point(0, 0),
      fillColor: new paper.Color('red')
    });
    scrollbar.setTrack(customTrack);
    expect(scrollbar.getTrack().bounds.point.x).toBe(customTrack.bounds.point.x);
    expect(scrollbar.getTrack().bounds.point.y).toBe(customTrack.bounds.point.y);
    expect(scrollbar.getTrack().bounds.size.width).toBe(customTrack.bounds.size.width);
    expect(scrollbar.getTrack().bounds.size.height).toBe(customTrack.bounds.size.height);
    expect(scrollbar.getTrack().pivot.x).toBe(customTrack.pivot.x);
    expect(scrollbar.getTrack().pivot.y).toBe(customTrack.pivot.y);
    expect((scrollbar.getTrack().fillColor as paper.Color)
      .equals(customTrack.fillColor as paper.Color)).toBe(true);
  });
});
