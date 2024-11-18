import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { NgCalendarModule } from 'ionic2-calendar';

// Verifique se o caminho está correto e o componente existe
import { EventDetailModalComponent } from '../event-detail-modal/event-detail-modal.component'; // Verifique o caminho

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgCalendarModule
  ],
  declarations: [
    HomePage,
    EventDetailModalComponent // Declarando o modal aqui
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Necessário para reconhecer os componentes Ionic
})
export class HomePageModule {}
