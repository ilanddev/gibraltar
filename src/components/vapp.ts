import * as paper from 'paper';
import { EntityLabelComponent } from './entity-label';
import { VmData } from './vm';
import { VmAndVnicListComponent } from './vm-and-vnic-list';
import { VAPP_BACKGROUND_COLOR } from '../constants/colors';
import { CONNECTOR_RADIUS, VIEW_BOTTOM_PADDING, DEFAULT_SCROLLBAR_THICKNESS, VAPP_NETWORK_RIGHT_MARGIN, VAPP_PADDING,
  DEFAULT_STROKE_WIDTH } from '../constants/dimensions';
import { MarginComponent } from './margin';
import { VappNetworkData } from './vapp-network';
import { VappNetworkListComponent } from './vapp-network-list';
import { ScrollbarComponent } from './scrollbar';

const MARGIN_RIGHT = 30;
const BACKGROUND_RADIUS = 5;
const LABEL_ICON_COLOR = '#CA67B8';
const VAPP_LABEL_BOTTOM_MARGIN = 20;
const EDGE_LABEL_BOTTOM_MARGIN = 15;

/**
 * Interface for vApp data.
 */
export interface VappData {
  uuid: string;
  name: string;
  vapp_networks: VappNetworkData[];
  vms: VmData[];
}

/**
 * Virtual Application Visual Component.
 */
export class VappComponent extends paper.Group {

  private label: EntityLabelComponent;
  private background: paper.Path.Rectangle;
  private _margin: MarginComponent;
  private vms: VmAndVnicListComponent;
  private vappNetworks: VappNetworkListComponent;
  // position for the division between any labels and vm/vnic list
  private divisionPositionY: number;
  private scrollbar: ScrollbarComponent;
  // content needs scrollbar
  private _isScrollable: boolean = false;

  /**
   * Creates a new VappComponent instance.
   *
   * @param _vapp the vapp data
   * @param _point the location that the vm should be rendered at
   */
  constructor(private _vapp: VappData,
              private _point: paper.Point = new paper.Point(0, 0)) {
    super();
    this.pivot = new paper.Point(0, 0);
    this.position = _point;

    let backgroundOffsetX = 0;
    let backgroundOffsetY = 0;
    const vappNetworkCount = this._vapp.vapp_networks.length;
    const vmCount = this._vapp.vms.length;

    // vapp label
    // x position based on if there are any vApp networks (and how many) or vms
    const labelPositionX = vappNetworkCount || vmCount
      ? Math.max(1, vappNetworkCount) * VAPP_NETWORK_RIGHT_MARGIN + VAPP_PADDING
      : VAPP_PADDING;
    this.label = new EntityLabelComponent(
      this._vapp.name,
      LABEL_ICON_COLOR,
      new paper.Point(labelPositionX, VAPP_PADDING),
      { fontWeight: 'bold' }
    );
    this.addChild(this.label);

    // start vapp network paths - add a point to each network to have x position data for matching vnics
    // and edge labels to have y position data for vapp header (which includes the vapp label and edge labels)
    if (vappNetworkCount) {
      this.vappNetworks = new VappNetworkListComponent(
        this._vapp.vapp_networks,
        new paper.Point(VAPP_PADDING + CONNECTOR_RADIUS, 0));
      this.addChild(this.vappNetworks);
    }

    // calculate division position between the vapp header (which includes the vapp label and edge labels) and vm
    // and vnic list
    const headerBase = this.globalToLocal(this.bounds.bottomLeft).y;
    // headerBase will equal vapp label bottom if there are no edge labels. margin based on which label is positionally
    // the lowest.
    const vappLabelIsBottomMost = headerBase === this.label.bounds.bottom;
    const headerBaseMargin = vappLabelIsBottomMost ? VAPP_LABEL_BOTTOM_MARGIN : EDGE_LABEL_BOTTOM_MARGIN;
    this.divisionPositionY = headerBase + headerBaseMargin;

    // maximum bottom position for vApp background based on the canvas view size
    const maxBottomPosition = this.globalToLocal(paper.view.bounds.bottomLeft).y - VIEW_BOTTOM_PADDING;

    // vms and vnics list
    this.vms = new VmAndVnicListComponent(
      this._vapp.vms,
      this.vappNetworks && this.vappNetworks.networkPositionsByName,
      this.vappNetworks && this.vappNetworks.lastNetworkPosition,
      new paper.Point(VAPP_PADDING + DEFAULT_STROKE_WIDTH, this.divisionPositionY));
    this.addChild(this.vms);

    this._isScrollable = this.vms.bounds.bottom > maxBottomPosition;

    // finish VappNetworks - draw the top external segment and internal segment based on matching vnic positions
    if (vappNetworkCount) {
      this.vappNetworks.setTopAndBottomSegments(this.vms.lowestVnicPointByNetworkName);
      // offset based on any edge labels that extend too far left (if it's on the first left-most vapp network)
      backgroundOffsetX = VAPP_PADDING - this.vappNetworks.bounds.left;
      // offset based on the vapp network paths' top external segment
      backgroundOffsetY = -this.vappNetworks.bounds.top + VAPP_PADDING;
    }

    // handles case where the vapp edge label is the bottom most child (when a nat-routed network has no attached
    // vnics and there are no vms) and updates background offset to accommodate the label's bottom arc icon
    if (!vmCount && !vappLabelIsBottomMost) {
      backgroundOffsetY += CONNECTOR_RADIUS;
    }

    // background - based on the bounds of all current items and placed beneath everything
    const content = this.bounds;
    this.background = new paper.Path.Rectangle({
      size: new paper.Size(
        content.width + VAPP_PADDING * 2 - backgroundOffsetX,
        this._isScrollable ? maxBottomPosition : content.height + VAPP_PADDING * 2 - backgroundOffsetY),
      point: new paper.Point(0, 0),
      radius: BACKGROUND_RADIUS,
      fillColor: VAPP_BACKGROUND_COLOR
    });
    this.insertChild(0, this.background);

    // set up scrolling if necessary
    if (this._isScrollable) {
      this.clipAndScrollVmList();
    }

    // margin - used by other vapps for static or dynamic positioning
    this._margin = new MarginComponent(this.background, 0, MARGIN_RIGHT, 0, 0);
    this.insertChild(0, this._margin);
  }

  /**
   * Gets the vApp data.
   */
  get data(): VappData {
    return this._vapp;
  }

  /**
   * Gets the margin.
   */
  get margin(): MarginComponent {
    return this._margin;
  }

  /**
   * Clips and adds scrolling to the VmAndVnicList component when it's too large for the view.
   */
  private clipAndScrollVmList(): void {
    // create drop shadow at the top of the vm list that fades in or out onScroll
    const dropShadow = new paper.Path.Rectangle({
      point: new paper.Point(0, 0),
      size: new paper.Size(this.bounds.width, this.divisionPositionY),
      opacity: 0,
      style: {
        fillColor: VAPP_BACKGROUND_COLOR,
        shadowColor: new paper.Color(0, 0, 0, 0.25),
        shadowBlur: 5,
        shadowOffset: new paper.Point(0, 2)
      }
    });

    // clip mask container that will clip any vm vnic list component items outside of the vapp background
    const vmListClipMask = new paper.Path.Rectangle(
      new paper.Point(0, this.divisionPositionY),
      new paper.Point(this.background.bounds.bottomRight));

    // clones segment of vapp network paths inside the vm vnic list component to separate for scrolling
    const vappNetworkClone = this.vappNetworks.cloneVmListSegments(this.divisionPositionY);

    // items that will be scrollable
    const scrollableContent = new paper.Group({
      children: [vappNetworkClone, this.vms]
    });

    // apply clip mask
    // tslint:disable-next-line
    new paper.Group({
      children: [vmListClipMask, scrollableContent, dropShadow],
      clipped: true,
      parent: this
    });

    // scrollbar set up
    const scrollbarPadding = 5;
    this.scrollbar = new ScrollbarComponent({
      content: scrollableContent,
      container: this,
      containerBounds: vmListClipMask.bounds,
      contentOffsetEnd: VAPP_PADDING / 2
    },
      new paper.Point(vmListClipMask.bounds.right - DEFAULT_SCROLLBAR_THICKNESS - scrollbarPadding,
        this.divisionPositionY),
      vmListClipMask.bounds.height - VAPP_PADDING,
      'vertical'
    );
    this.addChild(this.scrollbar);
    // drop shadow fades in or out onScroll
    this.scrollbar.setCustomEffects({
      setActive: function() {
        dropShadow.opacity = 1;
      },
      setNormal: function() {
        (dropShadow as any).tweenTo({
          opacity: 0
        }, 150);
      }
    });
  }
}
