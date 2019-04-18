import * as paper from 'paper';
import { VmData } from '../model/vm-data';
import { IconService } from '../services/icon-service';
import { LabelComponent } from './label-component';
import { IconLabelComponent } from './icon-label-component';

/**
 * Virtual Machine Visual Component.
 */
export class VmComponent extends paper.Group {

  private _label: LabelComponent;

  private animating: boolean = false;

  constructor(private _vm: VmData, private _point: paper.Point = new paper.Point(0, 0)) {
    super();
    const self = this;
    this.applyMatrix = false;
    this.position = _point;
    let idx = 0;
    self._label = new IconLabelComponent(self._vm.name,
        IconService.getOperatingSystemIcon(this._vm.operatingSystem),
        undefined);
    self._label.position = new paper.Point(0, 0);
    self.addChild(self._label);
    self.onMouseEnter = self.mouseEnter;
    self.onMouseLeave = self.mouseLeave;
  }

  getVm(): VmData {
    return this._vm;
  }

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

  private mouseEnter(event: paper.MouseEvent): void {
    this._label.setHover();
    paper.view.element.style.cursor = 'pointer';
  }

  private mouseLeave(event: paper.MouseEvent): void {
    this._label.setNormal();
    paper.view.element.style.cursor = 'default';
  }

}
