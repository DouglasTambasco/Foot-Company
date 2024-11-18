import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-adicionar-jogo',
  templateUrl: './adicionar-jogo.page.html',
  styleUrls: ['./adicionar-jogo.page.scss'],
})
export class AdicionarJogoPage {
  timeAdversario: string = '';
  dataPartida: string = '';
  horaPartida: string = '';
  localPartida: string = '';

  constructor(
    private firestore: AngularFirestore, 
    private router: Router, 
    private toastController: ToastController
  ) {}

  async adicionarJogo() {
    const jogo = {
      timeAdversario: this.timeAdversario,
      dataPartida: this.dataPartida,
      horaPartida: this.horaPartida,
      localPartida: this.localPartida
    };

    try {
      await this.firestore.collection('jogos').add(jogo);
      const toast = await this.toastController.create({
        message: 'Jogo adicionado com sucesso!',
        duration: 2000,
        color: 'success',
      });
      toast.present();
      this.router.navigate(['/treinos']);
    } catch (error: any) {
      const toast = await this.toastController.create({
        message: `Erro ao adicionar jogo: ${error.message}`,
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
