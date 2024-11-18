import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router, NavigationEnd, Event } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface UserData {
  name?: string;
  pernaPreferida?: string;
  numeroCamisa?: number;
  posicao?: string;
  altura?: number;
  peso?: number;
  age?: number;
  goals?: number;
  assists?: number;
}

interface MatchData {
  timeAdversario: string;
  dataPartida: string;
  horaPartida: string; // Garantir que inclui a hora da partida
  localPartida: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userName: string = 'Visitante';
  player: UserData | null = null;
  newGoals: number = 0;
  newAssists: number = 0;
  totalGoals: number = 0;
  totalAssists: number = 0;
  latestMatch: MatchData | null = null; // Exibir apenas a última partida

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private toastController: ToastController
  ) {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url === '/home' && this.router.getCurrentNavigation()?.extras.state?.['updated']) {
        this.loadPlayerProfile();
        this.loadLatestMatch();
      }
    });
  }

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.getUserName(user.uid);
        this.loadPlayerProfile();
        this.loadLatestMatch();
      } else {
        this.userName = 'Visitante';
      }
    });
  }

  async getUserName(uid: string) {
    try {
      const userDoc = await this.firestore.collection('users').doc(uid).get().toPromise();
      if (userDoc && userDoc.exists) {
        const userData = userDoc.data() as UserData;
        this.userName = userData?.name || 'Usuário';
      } else {
        this.userName = 'Usuário';
      }
    } catch (error) {
      console.error('Erro ao buscar o nome do usuário:', error);
      this.userName = 'Usuário';
    }
  }

  async loadPlayerProfile() {
    const user = await this.afAuth.currentUser;
    if (user) {
      try {
        const playerDoc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
        if (playerDoc && playerDoc.exists) {
          this.player = playerDoc.data() as UserData;
          this.totalGoals = this.player.goals || 0;
          this.totalAssists = this.player.assists || 0;
        } else {
          console.error('Perfil do jogador não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar o perfil do jogador:', error);
      }
    }
  }

  async loadLatestMatch() {
    try {
      const latestMatchSnapshot = await this.firestore.collection('jogos', ref => ref.orderBy('dataPartida', 'desc').limit(1)).get().toPromise();
      if (latestMatchSnapshot && !latestMatchSnapshot.empty) {
        this.latestMatch = latestMatchSnapshot.docs[0].data() as MatchData;
      } else {
        this.latestMatch = null;
      }
    } catch (error) {
      console.error('Erro ao carregar a última partida:', error);
    }
  }

  async saveStats() {
    const user = await this.afAuth.currentUser;
    if (user && this.player) {
      this.totalGoals += this.newGoals;
      this.totalAssists += this.newAssists;

      try {
        await this.firestore.collection('users').doc(user.uid).update({
          goals: this.totalGoals,
          assists: this.totalAssists
        });
        this.presentToast('Estatísticas salvas com sucesso!', 'success');
        this.newGoals = 0;
        this.newAssists = 0;
      } catch (error) {
        this.presentToast('Erro ao salvar estatísticas!', 'danger');
        console.error('Erro ao salvar estatísticas:', error);
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
