import { Component } from '@angular/core';

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
