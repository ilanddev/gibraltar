import * as paper from 'paper';
import { IconService } from '../services/icon-service';
import { OperatingSystem } from 'iland-sdk';
import { IconLabelComponent } from './icon-label';

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

  // a state variable that indicates whether an animation of this element is currently running
  private animating: boolean = false;

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
    if (!this.animating) {
      this.animating = true;
      (this as any).tween({
        'bounds.width': 1
      }, {
        'bounds.width': this.bounds.width
      }, 500).then(() => {
        this.animating = false;
      });
    }
  }

  /**
   * Handler for the mouse enter event.
   * @param event {paper.MouseEvent}
   */
  private mouseEnter(event: paper.MouseEvent): void {
    this._label.setHover();
    paper.view.element.style.cursor = 'pointer';
  }

  /**
   * Handler for the mouse leave event.
   * @param event {paper.MouseEvent}
   */
  private mouseLeave(event: paper.MouseEvent): void {
    this._label.setNormal();
    paper.view.element.style.cursor = 'default';
  }

}
