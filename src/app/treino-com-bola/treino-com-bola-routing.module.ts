import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreinoComBolaPage } from './treino-com-bola.page';

const routes: Routes = [
  {
    path: '',
    component: TreinoComBolaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreinoComBolaPageRoutingModule {}
