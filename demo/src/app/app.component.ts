import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: require('./app.component.html'),
  styles: [require('../styles.less'), require('./app.component.less')]
})
export class AppComponent {
  title = 'demo';
}
