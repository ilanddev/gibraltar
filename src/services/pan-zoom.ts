import * as paper from 'paper';

export class PanZoom {

  project: paper.Project;
  factor = 1.10;

  private _minZoom: number = .2;
  private _maxZoom: number = 5;
  private mouseNativeStart: paper.Point|null;
  private viewCenterStart: paper.Point|null;

  constructor(project: paper.Project) {
    this.project = project;
    const view = this.project.view;
    const self = this;
    view.element.addEventListener('mousewheel', (event: Event) => {
      const ev = event as MouseWheelEvent;
      ev.preventDefault();
      if (ev.ctrlKey) {
        const mousePosition = new paper.Point(ev.offsetX, ev.offsetY);
        self.changeZoomCentered(ev.deltaY, mousePosition);
      } else {
        if (Math.abs(ev.deltaY) >= Math.abs(ev.deltaX)) {
          self.scrollViewVertical(ev.deltaY);
        } else {
          self.scrollViewHorizontal(ev.deltaX);
        }
      }
    });
    view.on('mousedown', (ev: paper.MouseEvent) => {
      self.viewCenterStart = view.center;
      // Have to use native mouse offset, because ev.delta
      //  changes as the view is scrolled.
      self.mouseNativeStart = new paper.Point(ev.event.offsetX, ev.event.offsetY);
    });
    view.on('mousedrag', (ev: paper.MouseEvent) => {
      if (self.viewCenterStart) {
        const nativeDelta = new paper.Point(
            ev.event.offsetX - self.mouseNativeStart!.x,
            ev.event.offsetY - self.mouseNativeStart!.y
        );
        // Move into view coordinates to subtract delta,
        //  then back into project coords.
        view.center = view.viewToProject(
            view.projectToView(self.viewCenterStart)
                .subtract(nativeDelta));
      }
    });
    view.on('mouseup', (ev: paper.MouseEvent) => {
      if (self.mouseNativeStart) {
        self.mouseNativeStart = null;
        self.viewCenterStart = null;
      }
    });
  }

  get zoom(): number {
    return this.project.view.zoom;
  }

  get zoomRange(): number[] {
    return [this._minZoom, this._maxZoom];
  }

  /**
   * Set zoom level.
   * @returns zoom level that was set, or null if it was not changed
   */
  setZoomConstrained(zoom: number): number|null {
    if (this._minZoom) {
      zoom = Math.max(zoom, this._minZoom);
    }
    if (this._maxZoom) {
      zoom = Math.min(zoom, this._maxZoom);
    }
    const view = this.project.view;
    if (zoom !== view.zoom) {
      view.zoom = zoom;
      return zoom;
    }
    return null;
  }

  setZoomRange(range: paper.Size[]): number[] {
    const view = this.project.view;
    const aSize = range.shift();
    const bSize = range.shift();
    const a = aSize && Math.min(
        view.bounds.height / aSize.height,
        view.bounds.width / aSize.width);
    const b = bSize && Math.min(
        view.bounds.height / bSize.height,
        view.bounds.width / bSize.width);
    const min = Math.min(a!,b!);
    if (min) {
      this._minZoom = min;
    }
    const max = Math.max(a!,b!);
    if (max) {
      this._maxZoom = max;
    }
    return [this._minZoom, this._maxZoom];
  }

  changeZoomCentered(delta: number, mousePos: paper.Point) {
    if (!delta) {
      return;
    }
    const view = this.project.view;
    const oldZoom = view.zoom;
    const oldCenter = view.center;
    const viewPos = view.viewToProject(mousePos);

    let newZoom: number | null = delta > 0
        ? view.zoom * this.factor
        : view.zoom / this.factor;
    newZoom = this.setZoomConstrained(newZoom);

    if (!newZoom) {
      return;
    }

    const zoomScale = oldZoom / newZoom;
    const centerAdjust = viewPos.subtract(oldCenter);
    const offset = viewPos.subtract(centerAdjust.multiply(zoomScale))
                          .subtract(oldCenter);

    view.center = view.center.add(offset);
  }

  zoomTo(rect: paper.Rectangle) {
    const view = this.project.view;
    view.center = rect.center;
    view.zoom = Math.min(
        view.viewSize.height / rect.height,
        view.viewSize.width / rect.width);
  }

  scrollViewVertical(delta: number) {
    const view = this.project.view;
    const newY = view.center.y + (delta * 2);
    view.center = new paper.Point(view.center.x, newY);
  }

  scrollViewHorizontal(delta: number) {
    const view = this.project.view;
    const newX = view.center.x + (delta * 2);
    view.center = new paper.Point(newX, view.center.y);
  }

}
