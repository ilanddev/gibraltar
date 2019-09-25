import * as paper from 'paper';
import { IconService } from '../services/icon-service';
import { OperatingSystem } from 'iland-sdk';
import { IconLabelComponent } from './icon-label';
import { CanvasEventService } from '../services/canvas-event-service';
import { Subscription } from 'rxjs';
import { VnicData } from './vnic';

const SIZE_DELTA_ON_HOVER = 2;

export interface VmData {
  uuid: string;
  name: string;
  vapp_uuid: string;
  operatingSystem: OperatingSystem;
  vnics: VnicData[];
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
  private creating: boolean = false;
  private deleting: boolean = false;

  /**
   * Creates a new VmComponent instance.
   *
   * @param _vm the vm data
   * @param _point the location that the vm should be rendered at
   * @param visible whether the component is immediate visible (default is false because typically the component is
   * rendered with a creation animation
   */
  constructor(private _vm: VmData,
              private _point: paper.Point = new paper.Point(0, 0),
              visible: boolean = false) {
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
    this.visible = visible;
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
   * Triggers the VM deletion animation.
   */
  async animateDelete(): Promise<void> {
    if (!this.deleting) {
      this.deleting = true;
      return new Promise(resolve => {
        (this as any).tween({
          'bounds.width': this.bounds.width,
          'bounds.x': this.bounds.x,
          'bounds.height': this.bounds.height,
          'bounds.y': this.bounds.y
        }, {
          'bounds.width': 0,
          'bounds.x': this.bounds.x + this.bounds.width / 2,
          'bounds.height': 0,
          'bounds.y': this.bounds.y + this.bounds.height / 2
        }, 200).then(() => {
          this.visible = false;
          resolve();
        });
      });
    }
    return Promise.reject('animation already running');
  }

  /**
   * Triggers the VM creation animation.
   */
  async animateCreate(): Promise<void> {
    if (!this.creating) {
      this.visible = true;
      this.creating = true;
      return this._label.animateCreate().then(() => {
        this.creating = false;
      });
    }
    return Promise.reject('animation already running');
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
    if (!this.hovering && !this.creating) {
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
      const result = this._label.hitTest(this.globalToLocal(event.point));
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
   * Handler for the containing canvas mouse down event.
   * @param event {paper.MouseEvent}
   */
  private canvasMouseDown(event: paper.MouseEvent): void {
    if (this.active && !this.hitTest(event.point)) {
      this.active = false;
      this._label.setNormal();
    }
  }

}
