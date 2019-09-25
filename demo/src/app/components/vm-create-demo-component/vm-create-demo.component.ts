import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as paper from 'paper';
import { DemoComponent } from '../demo-component/demo.component';
import { VmComponent } from '../../../../../src/components/vm';

@Component({
  selector: 'vm-create-demo',
  template: `
	  <demo label="Creation Animation" height="140"
          description="Demonstrates the animation associated with VM creation."
          runnable="true" (run)="run()" (reset)="reset()"></demo>
  ` })
export class VmCreateDemoComponent implements AfterViewInit {

  @ViewChild(DemoComponent)
  demo: DemoComponent;

  private vmOne: VmComponent;
  private vmTwo: VmComponent;
  private vmThree: VmComponent;

  ngAfterViewInit() {
    const proj = this.demo.getProject();
    proj.activate();
    this.vmOne = new VmComponent({
      uuid: '',
      name: 'fedora',
      vapp_uuid: '',
      operatingSystem: 'redhatGuest',
      vnics: []
    }, new paper.Point(15, 15));
    this.vmTwo = new VmComponent({
      uuid: '',
      name: 'redhat linux vm',
      vapp_uuid: '',
      operatingSystem: 'windows7Guest',
      vnics: []
    }, new paper.Point(15, 55));
    this.vmThree = new VmComponent({
      uuid: '',
      name: 'centos vm with a really long name',
      vapp_uuid: '',
      operatingSystem: 'centos64Guest',
      vnics: []
    }, new paper.Point(15, 95));
  }

  run() {
    this.vmOne.animateCreate();
    setTimeout(() => {
      this.vmTwo.animateCreate();
    }, 1500);
    setTimeout(() => {
      this.vmThree.animateCreate();
    }, 3000);
  }

  reset() {
    this.demo.getProject().clear();
    this.ngAfterViewInit();
  }

}
