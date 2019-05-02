import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as paper from 'paper';
import { DemoComponent } from '../demo-component/demo.component';
import { VmComponent } from '../../../../../src/components/vm';

@Component({
  selector: 'vm-delete-demo',
  template: `
	  <demo label="Deletion Animation" height="140"
          description="Demonstrates the animation associated with VM deletion."
          runnable="true" (run)="run()" (reset)="reset()"></demo>
  ` })
export class VmDeleteDemoComponent implements AfterViewInit {

  @ViewChild(DemoComponent)
  demo: DemoComponent;

  private vmOne: VmComponent;
  private vmTwo: VmComponent;
  private vmThree: VmComponent;

  ngAfterViewInit() {
    const proj = this.demo.getProject();
    proj.activate();
    this.vmOne = new VmComponent({
      name: 'fedora',
      uuid: '',
      operatingSystem: 'fedora64Guest'
    }, new paper.Point(15, 15), true);
    this.vmTwo = new VmComponent({
      name: 'redhat linux vm',
      uuid: '',
      operatingSystem: 'redhatGuest'
    }, new paper.Point(15, 55), true);
    this.vmThree = new VmComponent({
      name: 'centos vm with a really long name',
      uuid: '',
      operatingSystem: 'centos64Guest'
    }, new paper.Point(15, 95), true);
  }

  run() {
    this.vmOne.animateDelete();
    setTimeout(() => {
      this.vmTwo.animateDelete();
    }, 1500);
    setTimeout(() => {
      this.vmThree.animateDelete();
    }, 3000);
  }

  reset() {
    this.demo.getProject().clear();
    this.ngAfterViewInit();
  }

}
