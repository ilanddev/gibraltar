import * as paper from 'paper';
import { VappNetworkData, VappNetworkComponent } from './vapp-network';
import { LowestVnicPointByNetworkName } from './vm-and-vnic-list';
import { DEFAULT_STROKE_STYLE } from '../constants/styles';
import { VAPP_NETWORK_RIGHT_MARGIN } from '../constants/dimensions';

/**
 * Interface for network positions by network name.
 */
export interface VappNetworkPositionsByName {
  [name: string]: paper.Point;
}

/**
 * Virtual Application Network Visual Component.
 */
export class VappNetworkListComponent extends paper.Group {
  // store network position by network name for matching vnic horizontal positioning
  private _networkPositionsByName: VappNetworkPositionsByName = {};
  // list of network paths for easier iteration
  private networkPathList: VappNetworkComponent[] = [];
  // number of isolated networks used to stagger the height of isolated network labels
  private isolatedNetworkCount = 0;

  /**
   * Creates a new VappNetworkListComponent instance.
   *
   * @param vappNetworks the vapp networks data
   * @param _point the location that the vapp network list should be rendered at
   */
  constructor(private _vappNetworks: VappNetworkData[],
              private _point: paper.Point = new paper.Point(0, 0)) {
    super();
    this.applyMatrix = false;
    this.pivot = new paper.Point(0, 0);
    this.position = this._point;

    // create and start the network path at the vapp's top boundary
    // number of edge networks used to stagger the height of edge network labels
    let edgeNetworkCount = 0;
    // TODO: pass in the y coordinate of matching org-vdc network when they are eventually included
    this._vappNetworks.forEach((networkData, index) => {
      const network = new VappNetworkComponent(
        networkData,
        new paper.Point(VAPP_NETWORK_RIGHT_MARGIN * index, 0),
        edgeNetworkCount
      );
      this._networkPositionsByName[networkData.name] = network.position;
      this.networkPathList.push(network);
      // insert at the bottom below any existing vapp network edge labels that were added in the VappNetworkComponent
      this.insertChild(0, network);
      if (networkData.fence_mode === 'NAT_ROUTED') {
        edgeNetworkCount++;
      } else if (networkData.fence_mode === 'ISOLATED') {
        this.isolatedNetworkCount++;
      }
    });
  }

  /**
   * Gets the vApp Network data.
   */
  get data(): VappNetworkData[] {
    return this._vappNetworks;
  }

  /**
   * Gets vApp network positions by name data for horizontally position matching VNICs.
   */
  get networkPositionsByName(): VappNetworkPositionsByName {
    return this._networkPositionsByName;
  }

  /**
   * Sets the vapp network top segment (above the vapp background) and the bottom segment (inside the vapp).
   * @param lowestVnicPointByNetworkName lowest vnic position by network name from VmAndVnicListComponent
   */
  setTopAndBottomSegments(lowestVnicPointByNetworkName: LowestVnicPointByNetworkName) {
    this.networkPathList.forEach(network => {
      // top segment above vApp background
      network.setTopmostSegmentAndConnection(this.isolatedNetworkCount);
      // bottom segment within vApp drawn to the lowest attached VNIC or disconnected if it has no VNICs
      if (lowestVnicPointByNetworkName[network.data.name]) {
        network.setBottommostSegment(lowestVnicPointByNetworkName[network.data.name].y);
      } else {
        network.setDisconnected();
      }
      if (network.data.fence_mode === 'ISOLATED') {
        this.isolatedNetworkCount--;
      }
    });
  }

  /**
   * Clones the bottom segment of vapp networks to separate for scrolling and removes the original segment.
   * @param splitPositionY vertical point where the network path should be split for cloning and separation
   */
  cloneVmListSegments(splitPositionY: number) {
    const clones = new paper.Group();
    clones.applyMatrix = false;
    clones.pivot = new paper.Point(0, 0);
    clones.position = this._point;
    this.networkPathList.forEach(network => {
      clones.addChild(network.cloneAndSplit(splitPositionY));
    });
    return clones;
  }
}
