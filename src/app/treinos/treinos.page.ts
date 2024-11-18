import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

interface UserData {
  isTreinador?: boolean;
  name?: string;
}

@Component({
  selector: 'app-treinos',
  templateUrl: './treinos.page.html',
  styleUrls: ['./treinos.page.scss'],
})
export class TreinosPage implements OnInit {
  treinoComBola: string[] = [];
  treinoSemBola: string[] = [];
  academia: string[] = [];
  isTreinador: boolean = false;
  userName: string = ' '; // Nome do usuário logado

  constructor(
    private firestore: AngularFirestore,
    private toastController: ToastController,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.verificarTreinador();
  }

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.getUserName(user.uid);
      } else {
        this.userName = 'Treinador';
      }
    });
  }

  async verificarTreinador() {
    const usuario = await this.afAuth.currentUser;

    if (usuario) {
      const userRef = this.firestore.collection('users').doc(usuario.uid);
      const userDoc = await userRef.get().toPromise();

      if (userDoc && userDoc.exists) {
        const userData = userDoc.data() as UserData;
        this.isTreinador = userData?.isTreinador || false;
      }
    }

    if (!this.isTreinador) {
      const toast = await this.toastController.create({
        message: 'Acesso restrito para treinadores.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

  async getUserName(uid: string) {
    try {
      const userDoc = await this.firestore.collection('users').doc(uid).get().toPromise();
      if (userDoc && userDoc.exists) {
        const userData = userDoc.data() as UserData;
        this.userName = userData?.name || 'Treinador';
      } else {
        this.userName = 'Treinador';
      }
    } catch (error) {
      console.error('Erro ao buscar o nome do usuário:', error);
      this.userName = 'Treinador';
    }
  }

  async adicionarTreino() {
    console.log("Formulário enviado");

    if (!this.treinoComBola.length || !this.treinoSemBola.length || !this.academia.length) {
      const toast = await this.toastController.create({
        message: 'Por favor, preencha todos os campos.',
        duration: 2000,
        color: 'warning',
      });
      toast.present();
      return;
    }

    const treinoData = {
      treinoComBola: this.treinoComBola,
      treinoSemBola: this.treinoSemBola,
      academia: this.academia,
    };

    try {
      const docRef = await this.firestore.collection('treinos').add(treinoData);

      const toast = await this.toastController.create({
        message: 'Treino adicionado com sucesso!',
        duration: 2000,
        color: 'success',
      });
      toast.present();

      this.treinoComBola = [];
      this.treinoSemBola = [];
      this.academia = [];

      console.log('Treino adicionado com sucesso', docRef.id);
    } catch (error: any) {
      console.error('Erro ao adicionar treino: ', error);

      const toast = await this.toastController.create({
        message: `Erro ao adicionar treino: ${error.message}`,
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      const toast = await this.toastController.create({
        message: 'Logout realizado com sucesso!',
        duration: 2000,
        color: 'success',
      });
      toast.present();
      // Redirecionar para a página de login
      this.router.navigateByUrl('/login');
    } catch (error: any) {
      const toast = await this.toastController.create({
        message: `Erro ao realizar logout: ${error.message || error}`,
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
