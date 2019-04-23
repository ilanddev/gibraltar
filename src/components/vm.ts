import * as paper from 'paper';
import { IconService } from '../services/icon-service';
import { OperatingSystem } from 'iland-sdk';
import { IconLabelComponent } from './icon-label';
import { CanvasEventService } from '../services/canvas-event-service';
import { Subscription } from 'rxjs';

const SIZE_DELTA_ON_HOVER = 2;

export interface VmData {
  operatingSystem: OperatingSystem;
  name: string;
  uuid: string;
}

/**
 * Virtual Machine Visual Component.
 */
export class VmComponent extends paper.Group {

  // the underlying icon label component
  private _label: IconLabelComponent;

  private canvasEvtSubscription: Subscription;
  private hovering: boolean = false;
  private active: boolean = false;
  private defaultWidth: number;
  private defaultX: number;
  private defaultY: number;

  /**
   * Creates a new VmComponent instance.
   *
   * @param _vm the vm data
   * @param _point the location that the vm should be rendered at
   */
  constructor(private _vm: VmData, private _point: paper.Point = new paper.Point(0, 0)) {
    super();
    const self = this;
    this.applyMatrix = false;
    this.position = _point;
    this.pivot = new paper.Point(0, 0);
    self._label = new IconLabelComponent(self._vm.name,
        IconService.getOperatingSystemIcon(this._vm.operatingSystem),
        undefined);
    self._label.position = new paper.Point(0, 0);
    self.addChild(self._label);
    self.onMouseEnter = self.mouseEnter;
    self.onMouseLeave = self.mouseLeave;
    self.onMouseUp = self.mouseUp;
    this.canvasEvtSubscription = CanvasEventService.getObservable(this.project, 'mousedown').subscribe(evt => {
      self.canvasMouseDown(evt);
    });
    this.defaultWidth = this.bounds.width;
    this.defaultX = this.bounds.x;
    this.defaultY = this.bounds.y;
  }

  /**
   * Gets the VM data.
   */
  getVmData(): VmData {
    return this._vm;
  }

  /**
   * Gets the VM label component.
   */
  getLabelComponent(): IconLabelComponent {
    return this._label;
  }

  /**
   * Triggers the VM creation animation.
   */
  animateCreate() {
    (this as any).tween({
      'bounds.width': 1
    }, {
      'bounds.width': this.defaultWidth
    }, 500);
  }

  /**
   * Removes this component.
   */
  remove(): boolean {
    this.canvasEvtSubscription.unsubscribe();
    return super.remove();
  }

  /**
   * Handler for the mouse enter event.
   * @param event {paper.MouseEvent}
   */
  private mouseEnter(event: paper.MouseEvent): void {
    if (!this.hovering) {
      this.hovering = true;
      (this as any).tween({
        'bounds.width': this.defaultWidth,
        'bounds.x': this.defaultX
      }, {
        'bounds.width': this.defaultWidth + 2 * SIZE_DELTA_ON_HOVER,
        'bounds.x': this.defaultX - SIZE_DELTA_ON_HOVER
      }, 100);
      if (!this.active) {
        this._label.setHover();
      }
      this.project.view.element.style.cursor = 'pointer';
    }
  }

  /**
   * Handler for the mouse leave event.
   * @param event {paper.MouseEvent}
   */
  private mouseLeave(event: paper.MouseEvent): void {
    if (this.hovering) {
      const result = this.hitTest(event.point);
      if (!result) {
        this.hovering = false;
        (this as any).tween({
          'bounds.width': this.bounds.width,
          'bounds.x': this.bounds.x
        }, {
          'bounds.width': this.defaultWidth,
          'bounds.x': this.defaultX
        }, 100);
        if (!this.active) {
          this._label.setNormal();
        }
        this.project.view.element.style.cursor = 'default';
      }
    }
  }

  /**
   * Handler for mouse up events.
   * @param event {paper.MouseEvent}
   */
  private mouseUp(event: paper.MouseEvent): void {
    if (!this.active) {
      this.active = true;
      this._label.setActive();
    }
  }

  /**
   * Handler for the containting canvas mouse down event.
   * @param event {paper.MouseEvent}
   */
  private canvasMouseDown(event: paper.MouseEvent): void {
    if (this.active && !this.hitTest(event.point)) {
      this.active = false;
      this._label.setNormal();
    }
  }

}
