import { Component } from '@angular/core';

@Component({
  selector: 'other-page',
  template: `
    <div id="other-page">
      <misc-scrollbar-horizontal-demo></misc-scrollbar-horizontal-demo>
      <misc-scrollbar-vertical-demo></misc-scrollbar-vertical-demo>
    </div>
  `
})
export class MiscPageComponent {
}
