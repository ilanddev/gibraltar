import { Edge } from 'iland-sdk';
import { InternalNetwork } from 'iland-sdk';
import { Org } from 'iland-sdk';
import { VappData } from './vapp-data';
import { OrgDataJson } from './json/org-data';

export class ExternalNetwork {

  constructor(private _uuid: string, private _name: string) {
  }

  get uuid() {
    return this._uuid;
  }

  get name() {
    return this._name;
  }

}

export class OrgData {

  private _externalNetworks: Array<string>;

  constructor(private _org: Org, private _edges: Array<Edge>, private _internalNetworks: Array<InternalNetwork>,
              private _vapps: Array<VappData>) {
  }

  static fromJson(json: OrgDataJson): OrgData {
    return new OrgData(new Org(json.org), json.edges.map(e => new Edge(e)),
        json.internalNetworks.map(n => new InternalNetwork(n)), json.vapps.map(v => VappData.fromJson(v)));
  }

  getOrg(): Org {
    return this._org;
  }

  getEdges(): Array<Edge> {
    return this._edges;
  }

  getVappsData(): Array<VappData> {
    return this._vapps;
  }

  getInternalNetworks() {
    return this._internalNetworks;
  }

  getExternalNetworks(): Array<ExternalNetwork> {
    const nets = new Map();
    for (const edge of this._edges) {
      for (const i of edge.interfaces) {
        if (i.type === 'uplink') {
          nets.set(i.networkUuid, new ExternalNetwork(i.networkUuid!, i.networkName!));
        }
      }
    }
    for (const intNet of this._internalNetworks) {
      if (intNet.fenceMode === 'BRIDGED' && !nets.has(intNet.parentNetworkUuid)) {
        nets.set(intNet.parentNetworkUuid,
            new ExternalNetwork(intNet.parentNetworkUuid!, intNet.gatewayAddress));
      }
    }
    return Array.from(nets.values());
  }

  toJsonObject(): OrgDataJson {
    return {
      org: this._org.json,
      vapps: this._vapps.map(v => v.toJsonObject()),
      edges: this._edges.map(e => e.json),
      internalNetworks: this._internalNetworks.map(i => i.json)
    };
  }

  toJsonString(): string {
    return JSON.stringify(this.toJsonObject());
  }

}
