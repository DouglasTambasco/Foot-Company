import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Treino } from './treino.model';  // Importando a interface

@Injectable({
  providedIn: 'root'
})
export class TreinoService {

  constructor(private firestore: AngularFirestore) {}

  // Função para adicionar um treino
  async adicionarTreino(horario: string, local: string, treinador: string): Promise<void> {
    // Criar o objeto treino conforme a interface Treino
    const novoTreino: Treino = {
      horario: horario,
      local: local,
      treinador: treinador
    };

    // Adicionar o treino na coleção "treinos"
    try {
      await this.firestore.collection('treinos').add(novoTreino);
      console.log('Treino adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar treino:', error);
    }
  }

  // Função para buscar todos os treinos
  getTreinos() {
    return this.firestore.collection('treinos').snapshotChanges();
  }

  // Outra forma de pegar treinos diretamente, já com tipagem
  getTreinosTyped() {
    return this.firestore.collection<Treino>('treinos').valueChanges();
  }
}
