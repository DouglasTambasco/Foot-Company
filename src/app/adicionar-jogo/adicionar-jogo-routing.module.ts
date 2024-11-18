import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarJogoPage } from './adicionar-jogo.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarJogoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarJogoPageRoutingModule {}
