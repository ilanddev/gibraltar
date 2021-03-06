import * as paper from 'paper';

/**
 * Main controller for the visualization.
 */
export class Gibraltar {

  // the canvas that the visualization is being rendered to
  private canvas: HTMLCanvasElement;

  constructor(canvas: string | HTMLCanvasElement) {
    if (canvas instanceof HTMLCanvasElement) {
      this.canvas = canvas;
    } else {
      const el = document.getElementById(canvas);
      if (el === null) {
        throw new Error(`could not find canvas element: #${canvas}`);
      }
      this.canvas = el as HTMLCanvasElement;
    }
    paper.setup(this.canvas);
  }

}
