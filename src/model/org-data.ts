import { Edge, InternalNetwork, Org } from 'iland-sdk';
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
      for (const i of edge.getInterfaces()) {
        if (i.getType() === 'uplink') {
          nets.set(i.getNetworkUuid(), new ExternalNetwork(i.getNetworkUuid(), i.getNetworkName()));
        }
      }
    }
    for (const intNet of this._internalNetworks) {
      if (intNet.getFenceMode() === 'BRIDGED' && !nets.has(intNet.getParentNetworkUuid())) {
        nets.set(intNet.getParentNetworkUuid(),
            new ExternalNetwork(intNet.getParentNetworkUuid()!, intNet.getGatewayAddress()));
      }
    }
    return Array.from(nets.values());
  }

  toJsonObject(): OrgDataJson {
    return {
      org: this._org.getJson(),
      vapps: this._vapps.map(v => v.toJsonObject()),
      edges: this._edges.map(e => e.getJson()),
      internalNetworks: this._internalNetworks.map(i => i.getJson())
    };
  }

  toJsonString(): string {
    return JSON.stringify(this.toJsonObject());
  }

}
