import * as paper from 'paper';
import { HORIZONTAL_PADDING, LabelComponent } from './label-component';
import { IconService } from '../services/icon-service';
import { ICON_SIZE } from '../constants/dimensions';

/**
 * Icon Label Visual Component.
 */
export class IconLabelComponent extends LabelComponent {

  private _icon: paper.PlacedSymbol;

  constructor(protected _text: string, symbolPromise: Promise<paper.Symbol>,
              protected _point: paper.Point = new paper.Point(0, 0)) {
    super(_text, _point);
    this.applyMatrix = false;
    this.pivot = new paper.Point(0, 0);
    const self = this;
    // tslint:disable-next-line:no-floating-promises
    symbolPromise.then(function(symbol) {
      if (self._icon) {
        self._icon.remove();
      }
      self._icon = symbol.place();
      self.addChild(self._icon);
      self._icon.pivot = new paper.Point(-ICON_SIZE / 2, -ICON_SIZE / 2);
      self._icon.position = new paper.Point(0, 0);
    });
    if (!self._icon) {
      this._icon = IconService.getDefaultIcon().place();
      this.addChild(this._icon);
      this._icon.pivot = new paper.Point(-ICON_SIZE / 2, -ICON_SIZE / 2);
      this._icon.position = new paper.Point(0, 0);
    }
    this._label.position.x = ICON_SIZE + HORIZONTAL_PADDING;
    this._background.pivot = new paper.Point(0, 0);
    this._background.position.x = ICON_SIZE / 2;
    this._background.bounds.width = this._background.bounds.width + (ICON_SIZE / 2);
  }

}
