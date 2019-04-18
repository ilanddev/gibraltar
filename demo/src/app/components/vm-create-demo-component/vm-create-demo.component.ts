import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { VmComponent } from '../../../../../src/components/vm-component';
import * as paper from 'paper';
import { DemoComponent } from '../demo-component/demo.component';

@Component({
  selector: 'vm-create-demo',
  template: `
	  <demo label="Creation Animation" height="60"
          description="This example demonstrates the animation associated with VM creation."
          runnable="true" (run)="run()"></demo>
  ` })
export class VmCreateDemoComponent implements AfterViewInit {

  @ViewChild(DemoComponent)
  demo: DemoComponent;

  private vm: VmComponent;

  ngAfterViewInit() {
    const proj1 = this.demo.getProject();
    proj1.activate();
    this.vm = new VmComponent({
      name: 'ubuntu',
      uuid: '',
      operatingSystem: 'fedora64Guest'
    }, new paper.Point(15, 15));
  }

  run() {
    this.vm.animateCreate();
  }

}
