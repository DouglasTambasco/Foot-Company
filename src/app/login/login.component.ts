import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Firebase Auth
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Firestore Database
import { Router } from '@angular/router';  // Router para navegação
import { ToastController } from '@ionic/angular';  // Toast para mensagens
import { HttpClient } from '@angular/common/http'; // Para fazer requisição HTTP

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  cep: string = '';
  street: string = ''; // Rua
  showPassword: boolean = false;
  isRegistering: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,  // Instância do Firestore Database
    private router: Router,  // Router para navegação
    private toastController: ToastController,  // ToastController para mensagens
    private http: HttpClient // Para realizar requisições HTTP
  ) {}

  // Função para exibir uma mensagem toast
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    toast.present();
  }

  // Função para buscar o endereço via API de CEP
  buscarCep() {
    if (this.cep.length === 8) { // Validação básica para o CEP
      this.http.get(`https://viacep.com.br/ws/${this.cep}/json/`)
        .subscribe(
          (data: any) => {
            if (!data.erro) {
              this.street = data.logradouro;
            } else {
              this.presentToast('CEP inválido', 'danger');
            }
          },
          (error) => {
            this.presentToast('Erro ao buscar o CEP', 'danger');
            console.error('Erro na busca do CEP:', error);
          }
        );
    } else {
      this.presentToast('Digite um CEP válido', 'warning');
    }
  }

  // Função de login com Firebase
  login() {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        this.presentToast('Login bem-sucedido!', 'success');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.presentToast(`Erro no login: ${error.message}`, 'danger');
      });
  }

  // Função de registro com Firebase
  register() {
    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          const userId = user.uid;
          this.firestore.collection('users').doc(userId).set({
            name: this.name,
            cep: this.cep,
            street: this.street
          }).then(() => {
            this.presentToast('Usuário registrado com sucesso!', 'success');
            this.toggleRegister();  // Volta para o modo de login automaticamente
            this.router.navigate(['/home']);
          }).catch((error) => {
            this.presentToast(`Erro ao salvar dados: ${error.message}`, 'danger');
          });
        }
      })
      .catch((error) => {
        this.presentToast(`Erro no registro: ${error.message}`, 'danger');
      });
  }

  // Função para alternar a visibilidade da senha
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Função para alternar entre as telas de login e registro
  toggleRegister() {
    this.isRegistering = !this.isRegistering;
  }
}
