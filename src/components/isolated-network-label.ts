import * as paper from 'paper';
import { LIGHT_GREY } from '../constants/colors';
import { SmallConnectorComponent } from './small-connector';
import { DEFAULT_MAX_LABEL_WIDTH } from '../constants/dimensions';

const LABEL_PADDING_LEFT = 10;

/**
 * Isolated Network Label Visual Component.
 */
export class IsolatedNetworkLabelComponent extends paper.Group {

  readonly _label: paper.PointText;
  // icon at the top of the isolated vApp network path
  readonly icon: SmallConnectorComponent;

  /**
   * Creates a new VappEdgeLabelComponent instance.
   *
   * @param network the network name
   * @param _point the location that the vApp edge label should be rendered at
   * @param maxWidth the maximum width of the label (text will be truncated with an ellipsis if the max width is
   * exceeded)
   */
  constructor(private network: string,
              private _point: paper.Point = new paper.Point(0, 0),
              private maxWidth: number = DEFAULT_MAX_LABEL_WIDTH) {
    super();
    this.applyMatrix = false;
    this.pivot = new paper.Point(0, 0);
    this.position = _point;

    this.icon = new SmallConnectorComponent();
    this.addChild(this.icon);

    this._label = new paper.PointText({
      content: this.network.toUpperCase(),
      fillColor: LIGHT_GREY,
      fontWeight: 'bold',
      fontSize: 10,
      parent: this
    });
    // position the label to the right of the icon
    this._label.bounds.leftCenter = this.icon.bounds.rightCenter.add(new paper.Point(LABEL_PADDING_LEFT, 0));
    this.clip();
  }

  /**
   * Gets the label.
   */
  get label(): paper.PointText {
    return this._label;
  }

  // TODO: maxWidth and clip is reused from the generic label component. is there a better way to share these?
  /**
   * Clips the text and inserts an ellipsis to ensure that the max width is not exceeded.
   */
  private clip() {
    let clipped = false;
    while (this._label.bounds.width > this.maxWidth) {
      clipped = true;
      this._label.content = this._label.content.substring(0, this._label.content.length - 1);
    }
    if (clipped) {
      this._label.content = this._label.content.substring(0, this._label.content.length - 3) + '...';
    }
  }
}
