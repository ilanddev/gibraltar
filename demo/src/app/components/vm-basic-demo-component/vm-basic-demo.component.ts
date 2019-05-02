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
      name: 'ubuntu',
      uuid: '',
      operatingSystem: 'ubuntu64Guest'
    }, new paper.Point(15, 15), true);
    // tslint:disable-next-line
    new VmComponent({
      name: 'fedora',
      uuid: '',
      operatingSystem: 'fedora64Guest'
    }, new paper.Point(15, 55), true);
    // tslint:disable-next-line
    new VmComponent({
      name: 'windows',
      uuid: '',
      operatingSystem: 'windows7Guest'
    }, new paper.Point(15, 95), true);
    // tslint:disable-next-line
    new VmComponent({
      name: 'windows xp',
      uuid: '',
      operatingSystem: 'winXPHomeGuest'
    }, new paper.Point(15, 135), true);
    // tslint:disable-next-line
    new VmComponent({
      name: 'debian',
      uuid: '',
      operatingSystem: 'debian8Guest'
    }, new paper.Point(15, 175), true);
    // tslint:disable-next-line
    new VmComponent({
      name: 'redhat',
      uuid: '',
      operatingSystem: 'redhatGuest'
    }, new paper.Point(15, 215), true);
    // tslint:disable-next-line
    new VmComponent({
      name: 'generic linux',
      uuid: '',
      operatingSystem: 'other24xLinux64Guest'
    }, new paper.Point(15, 255), true);
    // tslint:disable-next-line
    new VmComponent({
      name: 'centos',
      uuid: '',
      operatingSystem: 'centos64Guest'
    }, new paper.Point(15, 295), true);
    // tslint:disable-next-line
    new VmComponent({
      name: 'free bsd',
      uuid: '',
      operatingSystem: 'freebsd64Guest'
    }, new paper.Point(15, 335), true);
    // tslint:disable-next-line
    new VmComponent({
      name: 'core os',
      uuid: '',
      operatingSystem: 'coreos64Guest'
    }, new paper.Point(15, 375), true);
    // tslint:disable-next-line
    new VmComponent({
      name: 'generic operating system with long name',
      uuid: '',
      operatingSystem: 'other' as OperatingSystem
    }, new paper.Point(15, 415), true);
  }

}
