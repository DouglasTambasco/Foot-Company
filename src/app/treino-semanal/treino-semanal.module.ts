import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreinoSemanalPageRoutingModule } from './treino-semanal-routing.module';

import { TreinoSemanalPage } from './treino-semanal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreinoSemanalPageRoutingModule
  ],
  declarations: [TreinoSemanalPage]
})
export class TreinoSemanalPageModule {}