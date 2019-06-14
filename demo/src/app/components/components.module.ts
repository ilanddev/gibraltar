import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmBasicDemoComponent } from './vm-basic-demo-component/vm-basic-demo.component';
import { ComponentsPageComponent } from './components-page/components-page.component';
import { ComponentsRoutingModule } from './components-routing.module';

import { FormsModule } from '@angular/forms';
import { DemoComponent } from './demo-component/demo.component';
import { VmPageComponent } from './vm-page-component/vm-page.component';
import { VmCreateDemoComponent } from './vm-create-demo-component/vm-create-demo.component';
import { VmDeleteDemoComponent } from './vm-delete-demo-component/vm-delete-demo.component';
import { MiscPageComponent } from './misc-page-component/misc-page.component';
import { MiscScrollbarHorizontalDemoComponent } from
    './misc-scrollbar-demo-component/misc-scrollbar-horizontal-demo.component';
import { MiscScrollbarVerticalDemoComponent } from
    './misc-scrollbar-demo-component/misc-scrollbar-vertical-demo.component';

@NgModule({
  declarations: [
    VmPageComponent,
    VmCreateDemoComponent,
    VmDeleteDemoComponent,
    VmBasicDemoComponent,
    ComponentsPageComponent,
    DemoComponent,
    MiscPageComponent,
    MiscScrollbarHorizontalDemoComponent,
    MiscScrollbarVerticalDemoComponent
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
