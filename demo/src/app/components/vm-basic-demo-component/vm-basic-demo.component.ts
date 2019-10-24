import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as paper from 'paper';
import { OperatingSystem } from 'iland-sdk';
import { DemoComponent } from '../demo-component/demo.component';
import { VmComponent } from '../../../../../src/components/vm';

@Component({
  selector: 'vm-basic-demo',
  template: `
	  <demo label="Basic icons and styles" height="460"
          description="Demonstrates the fundamental styling of the VM visual component and enumerates all
          of the supported VM operating system icons."></demo>
  ` })
export class VmBasicDemoComponent implements AfterViewInit {

  @ViewChild(DemoComponent)
  demo: DemoComponent;

  ngAfterViewInit() {
    const proj1 = this.demo.getProject();
    proj1.activate();
    // tslint:disable-next-line
    new VmComponent({
      uuid: '',
      name: 'ubuntu',
      vapp_uuid: '',
      operatingSystem: 'ubuntu64Guest',
      vnics: []
    }, new paper.Point(15, 15), true);
    // tslint:disable-next-line
    new VmComponent({
      uuid: '',
      name: 'fedora',
      vapp_uuid: '',
      operatingSystem: 'fedora64Guest',
      vnics: []
    }, new paper.Point(15, 55), true);
    // tslint:disable-next-line
    new VmComponent({
      uuid: '',
      name: 'windows',
      vapp_uuid: '',
      operatingSystem: 'windows7Guest',
      vnics: []
    }, new paper.Point(15, 95), true);
    // tslint:disable-next-line
    new VmComponent({
      uuid: '',
      name: 'windows xp',
      vapp_uuid: '',
      operatingSystem: 'winXPHomeGuest',
      vnics: []
    }, new paper.Point(15, 135), true);
    // tslint:disable-next-line
    new VmComponent({
      uuid: '',
      name: 'debian',
      vapp_uuid: '',
      operatingSystem: 'debian8Guest',
      vnics: []
    }, new paper.Point(15, 175), true);
    // tslint:disable-next-line
    new VmComponent({
      uuid: '',
      name: 'redhat',
      vapp_uuid: '',
      operatingSystem: 'redhatGuest',
      vnics: []
    }, new paper.Point(15, 215), true);
    // tslint:disable-next-line
    new VmComponent({
      uuid: '',
      name: 'generic linux',
      vapp_uuid: '',
      operatingSystem: 'other24xLinux64Guest',
      vnics: []
    }, new paper.Point(15, 255), true);
    // tslint:disable-next-line
    new VmComponent({
      uuid: '',
      name: 'centos',
      vapp_uuid: '',
      operatingSystem: 'centos64Guest',
      vnics: []
    }, new paper.Point(15, 295), true);
    // tslint:disable-next-line
    new VmComponent({
      uuid: '',
      name: 'free bsd',
      vapp_uuid: '',
      operatingSystem: 'freebsd64Guest',
      vnics: []
    }, new paper.Point(15, 335), true);
    // tslint:disable-next-line
    new VmComponent({
      uuid: '',
      name: 'core os',
      vapp_uuid: '',
      operatingSystem: 'coreos64Guest',
      vnics: []
    }, new paper.Point(15, 375), true);
    // tslint:disable-next-line
    new VmComponent({
      uuid: '',
      name: 'generic operating system with long name',
      vapp_uuid: '',
      operatingSystem: 'other' as OperatingSystem,
      vnics: []
    }, new paper.Point(15, 415), true);
  }

}
