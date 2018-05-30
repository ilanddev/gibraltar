import * as paper from 'paper';
import { OperatingSystem } from 'iland-sdk';

const DEFAULT_ICON = require('file-loader!../assets/icons/genericvmicon.svg');
const EDGE_ICON = require('file-loader!../assets/icons/edge.svg');

export abstract class IconService {

  private static defaultIconSymbol: paper.Symbol|undefined;
  private static edgeIconSymbol: paper.Symbol|undefined;
  private static cache: Map<OperatingSystem, Promise<paper.Symbol>> = new Map();

  static async getOperatingSystemIcon(os: OperatingSystem): Promise<paper.Symbol> {
    if (!IconService.cache.has(os)) {
      IconService.cache.set(os, new Promise<paper.Symbol>(function(resolve) {
        paper.project.importSVG(IconService.getSvgUrlForOs(os), function(item: paper.Item) {
          item.scale(40 / item.bounds.width, 40 / item.bounds.height);
          resolve(new paper.Symbol(item));
        });
      }));
    }
    return IconService.cache.get(os)!;
  }

  static getEdgeIcon(): paper.Symbol {
    if (IconService.edgeIconSymbol === undefined) {
      const request = new XMLHttpRequest();
      request.open('GET', EDGE_ICON, false);
      request.send(null);
      if (request.status === 200) {
        const item = paper.project.importSVG(request.response);
        item.scale(40 / item.bounds.width, 40 / item.bounds.height);
        IconService.edgeIconSymbol = new paper.Symbol(item);
      }
    }
    return IconService.edgeIconSymbol!;
  }

  static getDefaultIcon(): paper.Symbol {
    if (IconService.defaultIconSymbol === undefined) {
      const request = new XMLHttpRequest();
      request.open('GET', DEFAULT_ICON, false);
      request.send(null);
      if (request.status === 200) {
        const item = paper.project.importSVG(request.response);
        item.scale(40 / item.bounds.width, 40 / item.bounds.height);
        IconService.defaultIconSymbol = new paper.Symbol(item);
      }
    }
    return IconService.defaultIconSymbol!;
  }

  private static getSvgUrlForOs(os: OperatingSystem): string {
    switch (os) {
      case 'ubuntuGuest' as OperatingSystem:
      case 'ubuntu64Guest' as OperatingSystem:
        return require('file-loader!../assets/icons/ubuntu.svg');
      case 'win2000AdvServGuest':
      case 'win2000ProGuest':
      case 'win2000ServGuest':
      case 'win31Guest':
      case 'win95Guest':
      case 'win98Guest':
      case 'windows7_64Guest':
      case 'windows7Guest':
      case 'windows7Server64Guest':
      case 'windows8_64Guest':
      case 'windows8Guest':
      case 'windows8Server64Guest':
      case 'windows9_64Guest':
      case 'windows9Guest':
      case 'windows9Server64Guest':
      case 'windowsHyperVGuest':
      case 'winLonghorn64Guest':
      case 'winLonghornGuest':
      case 'winMeGuest':
      case 'winNetBusinessGuest':
      case 'winNetDatacenter64Guest':
      case 'winNetDatacenterGuest':
      case 'winNetEnterprise64Guest':
      case 'winNetEnterpriseGuest':
      case 'winNetStandard64Guest':
      case 'winNetStandardGuest':
      case 'winNetWebGuest':
      case 'winNTGuest':
      case 'winVista64Guest':
      case 'winVistaGuest':
        return require('file-loader!../assets/icons/windows.svg');
      case 'winXPHomeGuest':
      case 'winXPPro64Guest':
      case 'winXPProGuest':
        return require('file-loader!../assets/icons/windowsxp.svg');
      case 'debian4_64Guest':
      case 'debian4Guest':
      case 'debian5_64Guest':
      case 'debian5Guest':
      case 'debian6_64Guest':
      case 'debian6Guest':
      case 'debian7_64Guest':
      case 'debian7Guest':
      case 'debian8_64Guest':
      case 'debian8Guest':
        return require('file-loader!../assets/icons/debian.svg');
      case 'coreos64Guest':
        return require('file-loader!../assets/icons/coreos.svg');
      case 'centos64Guest':
      case 'centosGuest':
        return require('file-loader!../assets/icons/centos.svg');
      case 'fedora64Guest':
      case 'fedoraGuest':
        return require('file-loader!../assets/icons/fedora.svg');
      case 'freebsd64Guest':
      case 'freebsdGuest':
        return require('file-loader!../assets/icons/freebsd.svg');
      case 'redhatGuest':
      case 'rhel2Guest':
      case 'rhel3_64Guest':
      case 'rhel3Guest':
      case 'rhel4_64Guest':
      case 'rhel4Guest':
      case 'rhel5_64Guest':
      case 'rhel5Guest':
      case 'rhel6_64Guest':
      case 'rhel6Guest':
      case 'rhel7_64Guest':
      case 'rhel7Guest':
        return require('file-loader!../assets/icons/redhat.svg');
      case 'other24xLinux64Guest':
      case 'other24xLinuxGuest':
      case 'other26xLinux64Guest':
      case 'other26xLinuxGuest':
      case 'other3xLinux64Guest':
      case 'other3xLinuxGuest':
      case 'otherLinux64Guest':
      case 'otherLinuxGuest':
      case 'oracleLinux64Guest':
      case 'oracleLinuxGuest':
      case 'suse64Guest':
      case 'suseGuest':
        return require('file-loader!../assets/icons/linux.svg');
      default:
        return DEFAULT_ICON;
    }
  }

}
