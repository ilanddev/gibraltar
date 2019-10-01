import * as paper from 'paper';
import { LIGHT_GREY } from '../constants/colors';
import { BulletPointConnectionIconComponent } from './bullet-point-connection-icon';
import { LabelTextComponent } from './label-text';

const LABEL_PADDING_LEFT = 10;

/**
 * Isolated Network Label Visual Component.
 */
export class IsolatedNetworkLabelComponent extends paper.Group {

  // the label text
  private _label: LabelTextComponent;
  // small circle icon at the top of the isolated vApp network path
  private icon: BulletPointConnectionIconComponent;

  /**
   * Creates a new IsolatedNetworkLabelComponent instance.
   *
   * @param network the network name
   * @param _point the location that the isolated network label should be rendered at
   */
  constructor(private network: string,
              private _point: paper.Point = new paper.Point(0, 0)) {
    super();
    this.pivot = new paper.Point(0, 0);
    this.position = _point;

    this.icon = new BulletPointConnectionIconComponent();

    this._label = new LabelTextComponent(
      this.network.toUpperCase(),
      new paper.Point(0, 0),{
        fillColor: LIGHT_GREY,
        fontWeight: 'bold',
        fontSize: 10
      });

    // position the label to the right of the icon
    this._label.bounds.leftCenter = this.icon.bounds.rightCenter.add(new paper.Point(LABEL_PADDING_LEFT, 0));

    this.addChildren([this.icon, this._label]);
  }

  /**
   * Gets the label.
   */
  get label(): LabelTextComponent {
    return this._label;
  }
}
