import * as paper from 'paper';
import { InternalNetwork } from 'iland-sdk';
import { CONNECTOR_COLOR, HOVER_COLOR, PATH_COLOR } from '../constants/colors';
import { CONNECTOR_RADIUS, PATH_STROKE_WIDTH } from '../constants/dimensions';
import { EventService } from '../services/event-service';
import { INTERNAL_NETWORK_MOUSE_ENTER, INTERNAL_NETWORK_MOUSE_LEAVE } from '../constants/events';

/**
 * Internal Network Visual Component.
 */
export class InternalNetworkComponent extends paper.Group {

  private _path: paper.Path.Rectangle;

  constructor(private _internalNetwork: InternalNetwork, private _point: paper.Point = new paper.Point(0, 0),
              private _pathLength: number = 1) {
    super();
    const self = this;
    this.applyMatrix = false;
    let size = new paper.Size(PATH_STROKE_WIDTH, _pathLength);
    this._path = new paper.Path.Rectangle(_point, size);
    this._path.fillColor = PATH_COLOR;
    this._path.applyMatrix = false;
    this._path.pivot = new paper.Point(0, 0);
    const circle = new paper.Path.Circle(this._path.bounds.bottomCenter, CONNECTOR_RADIUS);
    circle.fillColor = CONNECTOR_COLOR;
    this.addChildren([this._path, circle]);
    this.onMouseEnter = this.mouseEnter;
    this.onMouseLeave = this.mouseLeave;
    EventService.subscribe(INTERNAL_NETWORK_MOUSE_ENTER, this._internalNetwork.uuid,
        () => {
          this._path.fillColor = HOVER_COLOR;
        });
    EventService.subscribe(INTERNAL_NETWORK_MOUSE_LEAVE, this._internalNetwork.uuid,
        () => {
          self._path.fillColor = PATH_COLOR;
        });
  }

  /**
   * Gets the associated internal network data.
   * @returns {InternalNetwork}
   */
  getInternalNetworkData(): InternalNetwork {
    return this._internalNetwork;
  }

  getPath() {
    return this._path;
  }

  private mouseEnter(event: paper.MouseEvent): void {
    EventService.dispatch(INTERNAL_NETWORK_MOUSE_ENTER, this._internalNetwork.uuid);
  }

  private mouseLeave(event: paper.MouseEvent): void {
    EventService.dispatch(INTERNAL_NETWORK_MOUSE_LEAVE, this._internalNetwork.uuid);
  }

}
