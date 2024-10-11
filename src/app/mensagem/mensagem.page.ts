import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.page.html',
  styleUrls: ['./mensagem.page.scss'],
})
export class MensagemPage implements OnInit {
  currentUser: any = { id: 'currentUserId', name: 'Seu Nome' }; // Simulação do usuário logado
  selectedUser: any; // Usuário selecionado para o chat
  users: any[] = []; // Lista de usuários
  messages: any[] = []; // Mensagens entre currentUser e selectedUser
  newMessage: string = ''; // Campo para nova mensagem
  conversationId!: string; // ID da conversa

  constructor(private firestore: AngularFirestore, private router: Router) {}

  ngOnInit() {
    this.getUsers(); // Carregar os usuários cadastrados ao iniciar a página
  }

  getUsers() {
    // Carrega a lista de usuários cadastrados
    this.firestore.collection('users').valueChanges().subscribe((users: any[]) => {
      this.users = users.filter(user => user.id !== this.currentUser.id); // Remove o usuário atual da lista
    });
  }

  selectUser(user: any) {
    this.selectedUser = user; // Atribui o usuário selecionado
    console.log("Usuário selecionado:", this.selectedUser); // Log para depuração

    // Verifica se o usuário selecionado tem um ID
    if (this.selectedUser && this.selectedUser.id) {
      this.conversationId = this.getConversationId(this.currentUser.id, this.selectedUser.id);
      this.loadMessages(); // Carrega a conversa com o usuário selecionado
    } else {
      console.warn("O usuário selecionado não possui um ID."); // Log para verificar o problema
    }
  }

  getConversationId(userId1: string, userId2: string): string {
    return [userId1, userId2].sort().join('-'); // Cria um ID de conversa único
  }

  loadMessages() {
    // Carrega mensagens entre currentUser e selectedUser em tempo real
    if (this.conversationId) { // Verifica se conversationId está definido
      this.firestore.collection('conversas').doc(this.conversationId).valueChanges().subscribe((conversa: any) => {
        this.messages = conversa?.messages || []; // Carrega as mensagens ou inicializa como array vazio
      });
    }
  }

  sendMessage() {
    // Verifica se selectedUser e conversationId estão definidos antes de enviar a mensagem
    if (this.newMessage.trim() && this.selectedUser && this.conversationId) {
      // Verifica se o usuário selecionado é diferente do usuário atual
      if (this.selectedUser.id !== this.currentUser.id) {
        const message = {
          from: this.currentUser.id,
          to: this.selectedUser.id,
          text: this.newMessage,
          time: firebase.firestore.Timestamp.now() // Gera um timestamp atual
        };

        console.log("Mensagem a ser enviada:", message); // Log para verificar a mensagem

        // Atualiza a conversa existente ou cria uma nova se não existir
        this.firestore.collection('conversas').doc(this.conversationId).set({
          users: [this.currentUser.id, this.selectedUser.id],
          messages: firebase.firestore.FieldValue.arrayUnion(message)
        }, { merge: true }).then(() => {
          this.newMessage = ''; // Limpa o campo de mensagem após o envio
        }).catch(error => {
          console.error("Erro ao enviar mensagem: ", error);
        });
      } else {
        // Este log deve ser exibido se o usuário tentar enviar para si mesmo
        console.warn("Você não pode enviar mensagens para si mesmo."); 
      }
    } else {
      console.warn("Mensagem ou usuário selecionado inválido."); // Log para verificar o problema
    }
  }

  goBack() {
    this.router.navigate(['previous-page']); // Volta para a página anterior
  }
}
