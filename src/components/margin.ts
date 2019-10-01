import * as paper from 'paper';

const DEFAULT_MARGIN = 0;

/**
 * Interface for margin values.
 */
export class MarginValues {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Margin Component.
 */
export class MarginComponent extends paper.Group {

  private marginValues: MarginValues = {
    top: DEFAULT_MARGIN,
    right: DEFAULT_MARGIN,
    bottom: DEFAULT_MARGIN,
    left: DEFAULT_MARGIN
  };
  // the surrounding margin rectangle
  private margin: paper.Path.Rectangle;

  /**
   * Creates a new margin instance with a partial MarginValues instance.
   *
   * @param content The content that the margin surrounds.
   * @param marginValues Values for the margin sides. Can set `top`, `right`, `bottom`, or `left` partially with
   * an instance of MarginValues. Default is 0 for all margins.
   *
   * @example
   * // all values assigned
   * const marginValues: MarginValues = {
   *   top: 5,
   *   right: 21,
   *   bottom: 74,
   *   left: 12
   * };
   * const margin = new MarginComponent((your content), marginValues);
   *
   * @example
   * // values partially assigned
   * const marginValues: Partial<MarginValues> = {
   *   top: 5,
   *   right: 21
   * };
   * const margin = new MarginComponent((your content), marginValues);
   */
  constructor(content: paper.Item | paper.Group, marginValues: Partial<MarginValues>);
  /**
   * Creates a new margin instance with margin values written in CSS shorthand notation.
   *
   * @param content The content that the margin surrounds.
   * @param marginValuesCssShorthand Values for the margin sides. Can have a series of 0 to 4 that are comma separated
   * in CSS shorthand notation. Default is 0 for all margins.
   *
   * @example
   * // initialized with all four values in css shorthand notation - top, right, bottom, left
   * const margin = new MarginComponent((your content), 5, 21, 74, 12);
   *
   * @example
   * // initialized with two values in css shorthand notation - top/bottom, sides
   * const margin = new MarginComponent((your content), 10, 15);
   */
  constructor(content: paper.Item | paper.Group, ...marginValuesCssShorthand: number[]);
  /**
   * Creates a new margin instance.
   *
   * @param content The content that the margin surrounds.
   * @param values Values for the margin side. Implementation of overloaded marginValues: Partial<MarginValues> and
   * marginValuesCssShorthand: number[].
   */
  constructor(private content: paper.Item | paper.Group, ...values: Partial<MarginValues>[] | number[]) {
    super();
    this.pivot = new paper.Point(0, 0);

    this.marginValues = this.assignMarginValues(values);
    this.createAndPositionMargin();
  }

  /**
   * Sets new margin values with a partial MarginValues instance.
   *
   * @param marginValues Values for the margin sides. Can override current  `top`, `right`, `bottom`, or `left`
   * values partially with an instance of MarginValues. Default is the original assignment from instantiation for
   * all margins.
   *
   * @example
   * // all values set
   * const marginValues: MarginValues = {
   *   top: 5,
   *   right: 21,
   *   bottom: 74,
   *   left: 12
   * };
   * marginInstance.setValues(marginValues);
   *
   * @example
   * // values partially set
   * const marginValues: Partial<MarginValues> = {
   *   top: 5,
   *   right: 21
   * };
   * marginInstance.setValues(marginValues);
   */
  setValues(marginValues: Partial<MarginValues>): void;
  /**
   * Sets new margin values written in CSS shorthand notation.
   *
   * @param marginValuesCssShorthand Values for the margin sides. Can have a series of 0 to 4 that are comma separated
   * in CSS shorthand notation. Default is 0 for all margins.
   *
   * @example
   * // set all four values in css shorthand notation - top, right, bottom, left
   * marginInstance.setValues(5, 21, 74, 12);
   *
   * @example
   * // set with two values in css shorthand notation - top/bottom, sides
   * marginInstance.setValues(10, 15);
   */
  setValues(...marginValuesCssShorthand: number[]): void;
  /**
   * Sets new margin values.
   *
   * @param values Values for the margin side. Implementation of overloaded marginValues: Partial<MarginValues> and
   * marginValuesCssShorthand: number[].
   */
  setValues(...values: Partial<MarginValues>[] | number[]): void {
    const previousTop = this.marginValues.top;
    const previousLeft = this.marginValues.left;
    this.marginValues = this.assignMarginValues(values);
    this.rebuildMargin();
    this.content.position.y += this.marginValues.top - previousTop;
    this.content.position.x += this.marginValues.left - previousLeft;
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
   * Assigns margin values according to the type of the first value.
   * @param values Margin values.
   */
  private assignMarginValues(values: Partial<MarginValues>[] | number[]): MarginValues {
    const firstValue = values[0];
    return typeof firstValue === 'number'
      ? this.assignCssStyleMarginValues(values as number[])
      : { ...this.marginValues, ...firstValue };
  }

  /**
   * Assigns margin values based on CSS shorthand notation.
   * @param values Margin values.
   */
  private assignCssStyleMarginValues(values: number[]): MarginValues {
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
