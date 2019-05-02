import * as paper from 'paper';
import { VM_ICON_SIZE } from '../constants/dimensions';

const SLIDEOVER_ANIMATIONS_PER_SECOND = .125;
const SIZE = 30;
const BACKGROUND_COLOR = '#191C28';
const SPINNER_COLOR = '#81A2B6';
const SPINNER_ARC_WIDTH = 3;
const SPINNER_ARC_MARGIN = 9;
const ARC_ROTATE_ANGLE_PER_FRAME = 4;
const SLIDEOVER_DELAY_MS = 1000;
const HALF_VM_ICON_SIZE = VM_ICON_SIZE / 2;

/**
 * Icon Label Loader component.
 */
export class IconLabelLoaderComponent extends paper.Group {

  private _background: paper.Path.Rectangle;
  private _arc: paper.Path.Arc;
  private _raster: paper.Raster;
  private _animationRaster: paper.Raster | undefined;
  private _offset: number = 0;
  private _animationCompleteFn: () => void;
  private _animationStage: 'NONE' | 'LOADER' | 'SLIDEOVER' = 'NONE';

  constructor(private _point: paper.Point = new paper.Point(0, 0),
              symbolPromise: Promise<paper.Symbol>) {
    super();
    const self = this;
    this.applyMatrix = false;
    this.position = _point;
    this._background = new paper.Path.Rectangle({
      rectangle: new paper.Rectangle(0, 0,
          SIZE, SIZE),
      radius: 3
    });
    this._background.fillColor = BACKGROUND_COLOR;
    this._background.pivot = new paper.Point(0, 0);
    this._arc = new paper.Path.Arc({
      from: [HALF_VM_ICON_SIZE, SPINNER_ARC_MARGIN],
      through: [VM_ICON_SIZE - SPINNER_ARC_MARGIN, HALF_VM_ICON_SIZE],
      to: [SPINNER_ARC_MARGIN, HALF_VM_ICON_SIZE],
      strokeColor: SPINNER_COLOR,
      strokeWidth: SPINNER_ARC_WIDTH,
      strokeCap: 'round'
    });
    // tslint:disable-next-line:no-floating-promises
    symbolPromise.then(function(symbol) {
      const icon = symbol.place();
      icon.position = new paper.Point(HALF_VM_ICON_SIZE, HALF_VM_ICON_SIZE);
      self._raster = icon.rasterize();
      self._raster.visible = false;
      icon.remove();
    });
    this.addChild(this._background);
    this.addChild(this._arc);
    this.visible = false;
  }

  private drawRasterAnimation(offset: number) {
    if (this._animationRaster) {
      this._animationRaster.remove();
      this._animationRaster = undefined;
    }
    const naturalIconSize = VM_ICON_SIZE * 2;
    this._animationRaster = this._raster.getSubRaster(new paper.Rectangle(naturalIconSize - (offset * 2),
        0, naturalIconSize, naturalIconSize));
    this.addChild(this._animationRaster);
    this._animationRaster.pivot = new paper.Point(-VM_ICON_SIZE, -VM_ICON_SIZE);
    this._animationRaster.position = new paper.Point(0, 0);
  }

  async runAnimation(): Promise<void> {
    return new Promise(resolve => {
      this._offset = 0;
      this.visible = true;
      this._animationStage = 'LOADER';
      setTimeout(() => {
        this._animationStage = 'SLIDEOVER';
        this._animationCompleteFn = () => {
          this._animationStage = 'NONE';
          setTimeout(() => {
            this._offset = 0;
            this.drawRasterAnimation(this._offset);
            this.visible = false;
          });
          resolve();
        };
      }, SLIDEOVER_DELAY_MS);
    });
  }

  readonly onFrame = (event: paper.IFrameEvent) => {
    switch (this._animationStage) {
      case 'LOADER':
        this._arc.rotate(ARC_ROTATE_ANGLE_PER_FRAME);
        break;
      case 'SLIDEOVER':
        this._arc.rotate(ARC_ROTATE_ANGLE_PER_FRAME);
        const offsetChange = (event.delta / SLIDEOVER_ANIMATIONS_PER_SECOND) * VM_ICON_SIZE;
        this._offset = Math.min(VM_ICON_SIZE, this._offset + offsetChange);
        this.drawRasterAnimation(this._offset);
        if (this._offset === VM_ICON_SIZE) {
          this._animationCompleteFn();
        }
        break;
    }
  }

}
