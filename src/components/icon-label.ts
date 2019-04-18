import * as paper from 'paper';
import { IconService } from '../services/icon-service';
import { LABEL_HORIZONTAL_PADDING, VM_ICON_SIZE } from '../constants/dimensions';
import { LabelComponent } from './label';

/**
 * Icon LabelComponent Visual Component.
 */
export class IconLabelComponent extends LabelComponent {

  // the svg icon item
  private _icon: paper.PlacedSymbol;

  /**
   * Creates a new IconLabelComponent instance.
   *
   * @param _text the text to be displayed on the label
   * @param symbolPromise {Promise} that resolves with a paper Symbol
   * @param _point the location that the icon label should be renderd at
   */
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
      self._icon.pivot = new paper.Point(-VM_ICON_SIZE / 2, -VM_ICON_SIZE / 2);
      self._icon.position = new paper.Point(0, 0);
    });
    if (!self._icon) {
      this._icon = IconService.getDefaultIcon().place();
      this.addChild(this._icon);
      this._icon.pivot = new paper.Point(-VM_ICON_SIZE / 2, -VM_ICON_SIZE / 2);
      this._icon.position = new paper.Point(0, 0);
    }
    this._label.position.x = VM_ICON_SIZE + LABEL_HORIZONTAL_PADDING;
    this._background.pivot = new paper.Point(0, 0);
    this._background.position.x = VM_ICON_SIZE / 2;
    this._background.bounds.width = this._background.bounds.width + (VM_ICON_SIZE / 2);
  }

}
