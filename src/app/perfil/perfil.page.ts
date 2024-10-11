import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

// Interface para o perfil do usuário
interface UserProfile {
  name?: string;
  email?: string; // Adicionei o campo de email
  cep?: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userName: string = 'Usuário'; // Nome do usuário
  userEmail: string = ''; // Email do usuário
  userCep: string = ''; // CEP do usuário

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userProfileDoc = this.firestore.collection('users').doc<UserProfile>(user.uid).valueChanges();
      userProfileDoc.subscribe((profile) => {
        if (profile) {
          this.userName = profile.name ?? 'Usuário';
          this.userEmail = profile.email ?? ''; // Carregar o email
          this.userCep = profile.cep ?? '';
        } else {
          this.userName = 'Usuário';
          this.userEmail = ''; // Valor padrão para email
          this.userCep = '';
        }
      });
    }
  }

  async updateProfile() {
    const user = await this.afAuth.currentUser;
    if (user) {
      try {
        await this.firestore.collection('users').doc(user.uid).update({
          name: this.userName,
          email: this.userEmail,
          cep: this.userCep,
        });
        this.presentToast('Perfil atualizado com sucesso!', 'success');
      } catch (error: any) { // Adicionando a asserção de tipo 'any'
        this.presentToast('Erro ao atualizar perfil: ' + error.message, 'danger');
      }
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
