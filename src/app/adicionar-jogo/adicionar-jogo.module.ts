import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarJogoPageRoutingModule } from './adicionar-jogo-routing.module';

import { AdicionarJogoPage } from './adicionar-jogo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarJogoPageRoutingModule
  ],
  declarations: [AdicionarJogoPage]
})
export class AdicionarJogoPageModule {}
