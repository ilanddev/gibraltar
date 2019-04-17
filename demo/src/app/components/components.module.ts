import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmBasicDemoComponent } from './vm-basic-demo-component/vm-basic-demo.component';
import { ComponentsPageComponent } from './components-page/components-page.component';
import { ComponentsRoutingModule } from './components-routing.module';

import { FormsModule } from '@angular/forms';
import { DemoComponent } from './demo-component/demo.component';
import { VmPageComponent } from './vm-page-component/vm-page.component';

@NgModule({
  declarations: [
    VmPageComponent,
    VmBasicDemoComponent,
    ComponentsPageComponent,
    DemoComponent
  ],
  imports: [
    ComponentsRoutingModule,
    CommonModule,
    FormsModule
  ],
  exports: []
})
export class ComponentsModule {
}
