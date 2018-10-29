import * as paper from 'paper';
import { VappNetworkComponent } from './vapp-network-component';
import { VnicComponent } from './vnic-component';
import { CONNECTOR_COLOR, HOVER_COLOR, PATH_COLOR, VAPP_BACKGROUND_COLOR } from '../constants/colors';
import { CONNECTOR_RADIUS, PATH_STROKE_WIDTH } from '../constants/dimensions';
import { EventService } from '../services/event-service';
import { VAPP_NETWORK_MOUSE_ENTER, VAPP_NETWORK_MOUSE_LEAVE } from '../constants/events';

/**
 * Virtual Network Interface Card Network Connection Visual Component.
 */
export class VnicNetConnectionComponent extends paper.Group {

  private _path: paper.Path.Rectangle;
  private _connector: paper.Path.Circle;

  constructor(private _vnic: VnicComponent, private _vappNetwork: VappNetworkComponent,
              private _point: paper.Point = new paper.Point(0, 0)) {
    super();
    const self = this;
    this.applyMatrix = false;
    this.position = _point;
    const length = _vappNetwork.localToParent(_vappNetwork.getPath().bounds.topCenter).y -
        _vnic.parent.localToParent(_vnic.bounds.bottomCenter).y;
    const size = new paper.Size(PATH_STROKE_WIDTH, length);
    this._path = new paper.Path.Rectangle(new paper.Point(-PATH_STROKE_WIDTH / 2, 0), size);
    this._path.fillColor = PATH_COLOR;
    this._path.applyMatrix = false;
    this._path.pivot = new paper.Point(0, 0);
    this.addChild(this._path);
    this._connector = new paper.Path.Circle(new paper.Point(0, length + (PATH_STROKE_WIDTH / 2)), CONNECTOR_RADIUS -
        (PATH_STROKE_WIDTH / 2));
    this._connector.fillColor = VAPP_BACKGROUND_COLOR;
    this._connector.strokeColor = CONNECTOR_COLOR;
    this._connector.strokeWidth = PATH_STROKE_WIDTH;
    this.addChild(this._connector);
    this.onMouseEnter = this.mouseEnter;
    this.onMouseLeave = this.mouseLeave;
    EventService.observable.filter(it => it.type === VAPP_NETWORK_MOUSE_ENTER &&
        this._vappNetwork.getVappNetworkData().uuid === it.subjectUuid).subscribe(() => {
          self._path.fillColor = HOVER_COLOR;
        });
    EventService.observable.filter(it => it.type === VAPP_NETWORK_MOUSE_LEAVE &&
        this._vappNetwork.getVappNetworkData().uuid === it.subjectUuid).subscribe(() => {
          self._path.fillColor = PATH_COLOR;
        });
  }

  private mouseEnter(event: paper.MouseEvent): void {
    EventService.dispatch(VAPP_NETWORK_MOUSE_ENTER, this._vappNetwork.getVappNetworkData().uuid);
  }

  private mouseLeave(event: paper.MouseEvent): void {
    EventService.dispatch(VAPP_NETWORK_MOUSE_LEAVE, this._vappNetwork.getVappNetworkData().uuid);
  }

}
