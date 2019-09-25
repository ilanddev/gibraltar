import * as paper from 'paper';

const DEFAULT_MARGIN = 0;

/**
 * Interface for margin values.
 */
export interface MarginValues {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Margin Component.
 */
export class MarginComponent extends paper.Group {
  private marginValues: MarginValues;
  private margin: paper.Path.Rectangle;

  /**
   * Creates a new margin instance.
   *
   * @param content The content that the margin surrounds.
   * @param marginValues Values for the margin sides. Can have a series of 0 to 4 that are comma separated in CSS
   * shorthand order. Default is 0 for all margins.
   */
  constructor(private content: paper.Item | paper.Group, ...marginValues: number[]) {
    super();
    this.applyMatrix = false;
    this.pivot = new paper.Point(0, 0);

    this.marginValues = this.assignMarginValues(marginValues);
    this.createAndPositionMargin();
  }

  /**
   * Sets new margin values.
   * @param values Series of number values. Can have 0 to 4 that are comma separated in CSS shorthand order. Default
   * is 0 for all margins.
   */
  setValues(...values: number[]): void {
    const top = this.marginValues.top;
    const left = this.marginValues.left;
    this.marginValues = this.assignMarginValues(values);
    this.rebuildMargin();
    this.content.position.y += this.marginValues.top - top;
    this.content.position.x += this.marginValues.left - left;
  }

  /**
   * Sets top margin value.
   * @param newValue New value for top margin.
   */
  set top(newValue: number) {
    const delta = newValue - this.marginValues.top;
    this.marginValues.top = newValue;
    this.rebuildMargin();
    this.content.position.y += delta;
  }

  /**
   * Sets right margin value.
   * @param newValue New value for right margin.
   */
  set right(newValue: number) {
    this.marginValues.right = newValue;
    this.rebuildMargin();
  }

  /**
   * Sets bottom margin value.
   * @param newValue New value for bottom margin.
   */
  set bottom(newValue: number) {
    this.marginValues.bottom = newValue;
    this.rebuildMargin();
  }

  /**
   * Sets left margin value.
   * @param newValue New value for left margin.
   */
  set left(newValue: number) {
    const delta = newValue - this.marginValues.left;
    this.marginValues.left = newValue;
    this.rebuildMargin();
    this.content.position.x += delta;
  }

  /**
   * Assigns margin values based on CSS shorthand style.
   * @param values
   */
  private assignMarginValues(values: number[]): MarginValues {
    let top;
    let right;
    let bottom;
    let left;
    switch (values.length) {
      case 4:
        [top, right, bottom, left] = values;
        break;
      case 3:
        [top, right, bottom] = values;
        left = right;
        break;
      case 2:
        [top, right] = values;
        bottom = top;
        left = right;
        break;
      case 1:
        top = right = bottom = left = values[0];
        break;
      default:
        top = right = bottom = left = DEFAULT_MARGIN;
    }

    return {
      top: top,
      right: right,
      bottom: bottom,
      left: left
    };
  }

  /**
   * Creates and positions margin.
   */
  private createAndPositionMargin(): void {
    this.margin = new paper.Path.Rectangle({
      pivot: new paper.Point(0, 0),
      position: this.content.bounds.topLeft,
      size: this.content.bounds.size.add(new paper.Size(
        this.marginValues.left + this.marginValues.right,
        this.marginValues.top + this.marginValues.bottom)),
      parent: this
    });
    this.position = new paper.Point(-this.marginValues.left, -this.marginValues.top);
  }

  /**
   * Rebuilds margin.
   */
  private rebuildMargin(): void {
    this.margin.remove();
    this.createAndPositionMargin();
  }
}
