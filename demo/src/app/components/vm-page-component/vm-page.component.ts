import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { VmComponent } from '../../../../../src/components/vm-component';
import * as paper from 'paper';
import { OperatingSystem } from 'iland-sdk';
import { DemoComponent } from '../demo-component/demo.component';

@Component({
  selector: 'vm-demo',
  template: `
    <div id="vm-page">
      <vm-basic-demo></vm-basic-demo>
	    <vm-create-demo></vm-create-demo>
    </div>
  `
})
export class VmPageComponent {
}
