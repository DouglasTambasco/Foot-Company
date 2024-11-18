import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router'; // Importar o Router

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.page.html',
  styleUrls: ['./mensagem.page.scss'],
})
export class MensagemPage {
  player = {
    pernaPreferida: '',
    numeroCamisa: null,
    posicao: '',
    altura: null,
    peso: null,
  };

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router // Injetar o Router
  ) {}

  savePlayerProfile() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        const uid = user.uid;
        const playerData = {
          ...this.player,
          createdAt: new Date(),
          email: user.email
        };

        this.firestore.collection('users').doc(uid).set(playerData, { merge: true })
          .then(() => {
            console.log('Perfil salvo com sucesso para o usuário:', uid);
            // Navegar para a página "home" com um sinalizador
            this.router.navigate(['/home'], { state: { updated: true } });
          })
          .catch((error) => {
            console.error('Erro ao salvar perfil: ', error);
          });
      } else {
        console.error('Nenhum usuário logado');
      }
    });
  }
}
