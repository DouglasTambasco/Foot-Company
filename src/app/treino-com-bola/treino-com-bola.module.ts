import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreinoComBolaPageRoutingModule } from './treino-com-bola-routing.module';

import { TreinoComBolaPage } from './treino-com-bola.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreinoComBolaPageRoutingModule
  ],
  declarations: [TreinoComBolaPage]
})
export class TreinoComBolaPageModule {}
