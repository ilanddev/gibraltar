import * as paper from 'paper';
import { VappNetwork } from 'iland-sdk';
import { LabelComponent } from './label-component';
import { HOVER_COLOR, PATH_COLOR } from '../constants/colors';
import { EventService } from '../services/event-service';
import { VAPP_NETWORK_MOUSE_ENTER, VAPP_NETWORK_MOUSE_LEAVE } from '../constants/events';
import { LABEL_HEIGHT, PATH_STROKE_WIDTH } from '../constants/dimensions';

const LABEL_OFFSET = 100;

/**
 * vApp Network Visual Component.
 */
export class VappNetworkComponent extends paper.Group {

  private _path: paper.Path.Rectangle;
  private _label: LabelComponent;

  constructor(private _vappNetwork: VappNetwork, private _point: paper.Point = new paper.Point(0, 0),
              private _pathLength: number = 1) {
    super();
    const self = this;
    this.applyMatrix = false;
    this.position = _point;
    const size = new paper.Size(_pathLength, PATH_STROKE_WIDTH);
    this._path = new paper.Path.Rectangle(new paper.Point(0, 0), size);
    this._path.fillColor = PATH_COLOR;
    this._path.applyMatrix = false;
    this._path.pivot = new paper.Point(0, 0);
    this._label = new LabelComponent(_vappNetwork.name);
    this.addChild(this._path);
    this.addChild(this._label);
    this._label.pivot = new paper.Point(0, 0);
    this._label.position = new paper.Point(LABEL_OFFSET, -(LABEL_HEIGHT / 2));
    this.onMouseEnter = this.mouseEnter;
    this.onMouseLeave = this.mouseLeave;
    EventService.observable.filter(it => it.type === VAPP_NETWORK_MOUSE_ENTER &&
        this._vappNetwork.uuid === it.subjectUuid).subscribe(() => {
          self._label.setHover();
          self._path.fillColor = HOVER_COLOR;
        });
    EventService.observable.filter(it => it.type === VAPP_NETWORK_MOUSE_LEAVE &&
        this._vappNetwork.uuid === it.subjectUuid).subscribe(() => {
          self._label.setNormal();
          self._path.fillColor = PATH_COLOR;
        });
  }

  getPath(): paper.Path.Rectangle {
    return this._path;
  }

  /**
   * Gets the associated vApp Network data.
   * @returns {VappNetwork}
   */
  getVappNetworkData(): VappNetwork {
    return this._vappNetwork;
  }

  private mouseEnter(event: paper.MouseEvent): void {
    EventService.dispatch(VAPP_NETWORK_MOUSE_ENTER, this._vappNetwork.uuid);
  }

  private mouseLeave(event: paper.MouseEvent): void {
    EventService.dispatch(VAPP_NETWORK_MOUSE_LEAVE, this._vappNetwork.uuid);
  }

}
