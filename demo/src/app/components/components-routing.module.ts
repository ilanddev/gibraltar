import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsPageComponent } from './components-page/components-page.component';
import { VmPageComponent } from './vm-page-component/vm-page.component';

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
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'vm',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
