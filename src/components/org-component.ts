import * as paper from 'paper';
import { InternalNetworkComponent } from './internal-network-component';
import { OrgData } from '../model/org-data';
import { VappComponent } from './vapp-component';
import { InternalNetwork } from 'iland-sdk';
import { VappConnectionComponent } from './vapp-connection-component';
import { ExternalNetworkComponent } from './external-network-component';
import { OrgNetworksConnectionComponent } from './org-networks-connection-component';

// TODO extract constants
const INTERNAL_NETWORK_SPACING = 50;

export class OrgItem extends paper.Group {

  private _internalNetComponents: Array<InternalNetworkComponent> = [];
  private _vappComponents: Array<VappComponent> = [];
  private _vappConnectionComponents: Array<VappConnectionComponent> = [];
  private _externalNetworkComponents: Array<ExternalNetworkComponent> = [];

  constructor(private _org: OrgData) {
    super();
    this.applyMatrix = false;
    this.drawVapps();
    this.drawInternalNetworks();
    this.drawVappConnections();
    this.drawExternalNetworks();
    this.drawOrgNetworkConnections();
  }

  private drawInternalNetworks() {
    let self = this;
    const sortedInternalNetworks = self._org.getInternalNetworks()!.sort(this.sortInternalNetworks);
    let idx = 0;
    const vappComponents = this._vappComponents.slice().reverse();
    for (const internalNetwork of sortedInternalNetworks) {
      let x = INTERNAL_NETWORK_SPACING * idx;
      const lastVapp = vappComponents.find(v => v.getVappData().isConnectedToInternalNetwork(internalNetwork));
      const length = lastVapp !== undefined ? lastVapp.bounds.top + 50 : 0;
      const internalNetworkItem = new InternalNetworkComponent(internalNetwork, new paper.Point(-x, 0), length);
      self._internalNetComponents.push(internalNetworkItem);
      idx++;
    }
    self.addChildren(self._internalNetComponents);
  }

  private drawVapps() {
    const self = this;
    let idx = 0;
    for (const vapp of this._org.getVappsData()) {
      const vappComponent = new VappComponent(vapp);
      self.addChild(vappComponent);
      const y = idx === 0 ? 50 : self._vappComponents[self._vappComponents.length - 1].bounds.bottom + 60;
      vappComponent.translate(new paper.Point(100, y));
      self._vappComponents.push(vappComponent);
      idx++;
    }
  }

  private drawVappConnections() {
    const self = this;
    for (const vapp of self._vappComponents) {
      const connection = new VappConnectionComponent(vapp, self._internalNetComponents);
      self.addChild(connection);
      vapp.bringToFront();
      connection.insertBelow(vapp);
      self._vappConnectionComponents.push(connection);
    }
  }

  private sortInternalNetworks(one: InternalNetwork, two: InternalNetwork): number {
    switch (one.fenceMode) {
      case 'BRIDGED':
        if (two.fenceMode === 'BRIDGED') {
          return 0;
        } else {
          return 1;
        }
      case 'NAT_ROUTED':
        if (two.fenceMode === 'NAT_ROUTED') {
          return 0;
        } else if (two.fenceMode === 'BRIDGED') {
          return -1;
        } else {
          return 1;
        }
      case 'ISOLATED':
        if (two.fenceMode === 'ISOLATED') {
          return 0;
        } else {
          return -1;
        }
      default:
        return 0;
    }
  }

  private drawExternalNetworks() {
    let idx = 0;
    for (const extNet of this._org.getExternalNetworks()) {
      const y = -150 - (idx * 50);
      const x = this._internalNetComponents.map(n => n.bounds.left).reduce((p, c) => p < c ? p : c, 0) - 50;
      const component = new ExternalNetworkComponent(extNet, new paper.Point(x, y), 200 - x);
      this.addChild(component);
      component.sendToBack();
      this._externalNetworkComponents.push(component);
      idx++;
    }
  }

  private drawOrgNetworkConnections() {
    const connections = new OrgNetworksConnectionComponent(this._externalNetworkComponents, this._internalNetComponents,
        this._org.getEdges());
    connections.insertBelow(this._internalNetComponents[0]);
  }

}
