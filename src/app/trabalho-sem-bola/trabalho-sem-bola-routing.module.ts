import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrabalhoSemBolaPage } from './trabalho-sem-bola.page';

const routes: Routes = [
  {
    path: '',
    component: TrabalhoSemBolaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrabalhoSemBolaPageRoutingModule {}
