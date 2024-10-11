import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrabalhoSemBolaPageRoutingModule } from './trabalho-sem-bola-routing.module';

import { TrabalhoSemBolaPage } from './trabalho-sem-bola.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrabalhoSemBolaPageRoutingModule
  ],
  declarations: [TrabalhoSemBolaPage]
})
export class TrabalhoSemBolaPageModule {}
