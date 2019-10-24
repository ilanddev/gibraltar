import { Component } from '@angular/core';

@Component({
  selector: 'misc-page',
  template: `
    <div id="misc-page">
      <misc-scrollbar-horizontal-demo></misc-scrollbar-horizontal-demo>
      <misc-scrollbar-vertical-demo></misc-scrollbar-vertical-demo>
    </div>
  `
})
export class MiscPageComponent {
}
