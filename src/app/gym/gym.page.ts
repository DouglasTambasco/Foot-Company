import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

interface UserData {
  name: string;
}

@Component({
  selector: 'app-gym',
  templateUrl: './gym.page.html',
  styleUrls: ['./gym.page.scss'],
})
export class GymPage implements OnInit {
  userName: string = 'Visitante'; // Inicializa como 'Visitante'// Exemplo de dados para exercícios

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.getUserName(user.uid);
      } else {
        this.userName = 'Visitante'; // Caso não tenha um usuário autenticado
      }
    });
  }

  async getUserName(uid: string) {
    try {
      const userDoc = await this.firestore.collection('users').doc(uid).get().toPromise();
      if (userDoc && userDoc.exists) {
        const userData = userDoc.data() as UserData;
        this.userName = userData && userData.name ? userData.name : 'Usuário';
      } else {
        this.userName = 'Usuário';
      }
    } catch (error) {
      console.error('Erro ao buscar o nome do usuário:', error);
      this.userName = 'Usuário';
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      this.presentToast('Logout bem-sucedido!', 'success');
      this.router.navigate(['/login']);
    } catch (error) {
      let errorMessage = 'Erro desconhecido';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      this.presentToast(`Erro no logout: ${errorMessage}`, 'danger');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
    });
    toast.present();
  }
}
