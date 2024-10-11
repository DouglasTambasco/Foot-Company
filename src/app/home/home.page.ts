import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';

interface UserData {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userName: string = 'Visitante'; // Inicializa como 'Visitante'

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
      if (userDoc && userDoc.exists) { // Verifica se userDoc não é undefined e existe
        const userData = userDoc.data() as UserData; // Casting seguro para UserData
        this.userName = userData && userData.name ? userData.name : 'Usuário';
      } else {
        this.userName = 'Usuário'; // Define como 'Usuário' se o documento não existir
      }
    } catch (error) {
      console.error('Erro ao buscar o nome do usuário:', error);
      this.userName = 'Usuário'; // Define um nome padrão em caso de erro
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

  async goToGym() {
    this.router.navigate(['/gym']);
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
