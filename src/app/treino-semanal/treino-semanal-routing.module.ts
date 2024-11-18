import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreinoSemanalPage } from './treino-semanal.page';

const routes: Routes = [
  {
    path: '',
    component: TreinoSemanalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreinoSemanalPageRoutingModule {}