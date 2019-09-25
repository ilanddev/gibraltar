import * as paper from 'paper';
import { EntityLabelComponent } from './entity-label';
// import { VappNetworkData } from './vapp-network';
import { VAPP_BACKGROUND_COLOR, LIGHT_GREY } from '../constants/colors';
import { CONNECTOR_RADIUS, DEFAULT_STROKE_WIDTH, LABEL_HEIGHT, CONNECTOR_MARGIN } from '../constants/dimensions';
import { DEFAULT_STROKE_STYLE } from '../constants/styles';

const ICON_COLOR = '#EBB86C';

/**
 * Vapp Nat-Routed Edge Label Visual Component.
 */
export class VappEdgeLabelComponent extends paper.Group {

  readonly _label: EntityLabelComponent;

  /**
   * Creates a new VappEdgeLabelComponent instance.
   *
   * @param vappEdge the vappEdge data
   * @param _point the location that the component will be rendered at.
   */
  constructor(private _text: string,
              private _point: paper.Point = new paper.Point(0, 0)) {
    super();
    this.applyMatrix = false;
    this.pivot = new paper.Point(0, 0);
    this.position = _point;

    this._label = new EntityLabelComponent(this._text, ICON_COLOR);
    this._label.getBackgroundComponent().style = {
      ...DEFAULT_STROKE_STYLE,
      fillColor: VAPP_BACKGROUND_COLOR
    };
    this.addChild(this._label);

    // create the top and bottom arcs that connects the label to the network path
    const connectorTopArc = new paper.Path.Arc({
      from: new paper.Point(-CONNECTOR_RADIUS, 0),
      through: new paper.Point(0, -CONNECTOR_RADIUS),
      to: new paper.Point(CONNECTOR_RADIUS, 0),
      pivot: new paper.Point(0, 0),
      position: new paper.Point(CONNECTOR_MARGIN + CONNECTOR_RADIUS - DEFAULT_STROKE_WIDTH / 2, 0),
      fillColor: LIGHT_GREY,
      parent: this
    });
    const connectorBottomArc = connectorTopArc.clone();
    connectorBottomArc.rotate(180);
    connectorBottomArc.position.y = LABEL_HEIGHT;
  }

  /**
   * Gets the label text.
   */
  get text(): string {
    return this._text;
  }
}
