import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TreinosPageRoutingModule } from './treinos-routing.module'; // Roteamento
import { TreinosPage } from './treinos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreinosPageRoutingModule // Roteamento
  ],
  declarations: [TreinosPage]
})
export class TreinosPageModule {}
