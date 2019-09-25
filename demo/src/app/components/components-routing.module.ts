import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsPageComponent } from './components-page/components-page.component';
import { VmPageComponent } from './vm-page-component/vm-page.component';
import { VappPageComponent } from './vapp-page-component/vapp-page.component';
import { MiscPageComponent } from './misc-page-component/misc-page.component';

const routes = [
  {
    path: '',
    component: ComponentsPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'vm',
        pathMatch: 'full'
      },
      {
        path: 'vm', component: VmPageComponent
      },
      {
        path: 'vapp', component: VappPageComponent
      },
      {
        path: 'misc', component: MiscPageComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'vm'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
