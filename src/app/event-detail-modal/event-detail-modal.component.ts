import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-event-detail-modal',
  templateUrl: './event-detail-modal.component.html',
  styleUrls: ['./event-detail-modal.component.scss'],
})
export class EventDetailModalComponent {
  // Recebe os dados do evento como entrada
  @Input() eventDetails: any;

  constructor(private modalController: ModalController) {}

  // Método para fechar o modal
  closeModal() {
    this.modalController.dismiss();
  }
}