import * as paper from 'paper';
import { LabelComponent } from './label-component';
import { ExternalNetwork } from '../model/org-data';
import { HOVER_COLOR, PATH_COLOR } from '../constants/colors';
import { LABEL_HEIGHT, PATH_STROKE_WIDTH } from '../constants/dimensions';
import { EventService } from '../services/event-service';
import { EXTERNAL_NETWORK_MOUSE_ENTER, EXTERNAL_NETWORK_MOUSE_LEAVE } from '../constants/events';

const EXTERNAL_NET_MAX_LABEL_LENGTH = 350;

/**
 * External Network Visual Component.
 */
export class ExternalNetworkComponent extends paper.Group {

  private _path: paper.Path.Rectangle;
  private _label: LabelComponent;

  constructor(private _externalNetwork: ExternalNetwork, private _point: paper.Point = new paper.Point(0, 0),
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
    this._label = new LabelComponent(_externalNetwork.name, undefined, undefined, EXTERNAL_NET_MAX_LABEL_LENGTH);
    this.addChild(this._path);
    this.addChild(this._label);
    this._label.pivot = new paper.Point(0, 0);
    this._label.position = new paper.Point(_pathLength, -(LABEL_HEIGHT / 2));
    this.onMouseEnter = this.mouseEnter;
    this.onMouseLeave = this.mouseLeave;
    EventService.observable.filter(it => it.type === EXTERNAL_NETWORK_MOUSE_ENTER &&
        this._externalNetwork.uuid === it.subjectUuid).subscribe(() => {
          self._label.setHover();
          self._path.fillColor = HOVER_COLOR;
        });
    EventService.observable.filter(it => it.type === EXTERNAL_NETWORK_MOUSE_LEAVE &&
        this._externalNetwork.uuid === it.subjectUuid).subscribe(() => {
          self._label.setNormal();
          self._path.fillColor = PATH_COLOR;
        });
  }

  getPath(): paper.Path.Rectangle {
    return this._path;
  }

  /**
   * Gets the associated External Network data.
   * @returns {ExternalNetwork}
   */
  getExternalNetworkData(): ExternalNetwork {
    return this._externalNetwork;
  }

  private mouseEnter(event: paper.MouseEvent): void {
    EventService.dispatch(EXTERNAL_NETWORK_MOUSE_ENTER, this._externalNetwork.uuid);
  }

  private mouseLeave(event: paper.MouseEvent): void {
    EventService.dispatch(EXTERNAL_NETWORK_MOUSE_LEAVE, this._externalNetwork.uuid);
  }

}
