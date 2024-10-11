import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcademiaPageRoutingModule } from './academia-routing.module';

import { AcademiaPage } from './academia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcademiaPageRoutingModule
  ],
  declarations: [AcademiaPage]
})
export class AcademiaPageModule {}
