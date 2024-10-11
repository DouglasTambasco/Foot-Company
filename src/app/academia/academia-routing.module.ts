import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademiaPage } from './academia.page';

const routes: Routes = [
  {
    path: '',
    component: AcademiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademiaPageRoutingModule {}
