import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'components',
    loadChildren: './components/components.module#ComponentsModule'
  },
  {
    path: '',
    redirectTo: 'components',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'components'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
