import * as paper from 'paper';
import { ConnectorComponent } from './connector';
import { VAPP_BACKGROUND_COLOR } from '../constants/colors';
import { DEFAULT_STROKE_STYLE } from '../constants/styles';

/**
 * Interface for vnic data.
 */
export interface VnicData {
  vnic_id: number;
  network_name: string;
  is_connected: boolean;
}

/**
 * Virtual Network Identifier Card Visual Component.
 */
export class VnicComponent extends paper.Group {

  readonly icon: ConnectorComponent;

  /**
   * Creates a new VnicComponent instance.
   * @param vnic The vnic data.
   * @param _point The position where the vnic will be rendered at. Default is (0, 0).
   */
  constructor(private _vnic: VnicData,
              private _point: paper.Point = new paper.Point(0, 0)) {
    super();
    this.applyMatrix = false;
    this.position = _point;

    this.icon = new ConnectorComponent();
    this.addChild(this.icon);

    // draw additional icon visual elements (slash and circle cut) if vnic is disconnected
    if (!this._vnic.is_connected) {
      let disconnectSlash = new paper.Path.Line(new paper.Point(-17 / 2, 0), new paper.Point(17 / 2, 0));
      disconnectSlash.rotate(-45);
      disconnectSlash.style = DEFAULT_STROKE_STYLE;
      let disconnectCut = disconnectSlash.clone();
      disconnectCut.style = {
        strokeWidth: 6,
        strokeColor: VAPP_BACKGROUND_COLOR
      };
      this.addChildren([disconnectCut, disconnectSlash]);
    }
  }

  /**
   * Gets the VnicData.
   */
  get data(): VnicData {
    return this._vnic;
  }
}
