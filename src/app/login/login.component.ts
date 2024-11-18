import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Firebase Auth
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Firestore Database
import { Router } from '@angular/router';  // Router para navegação
import { ToastController } from '@ionic/angular';  // Toast para mensagens
import { HttpClient } from '@angular/common/http'; // Para fazer requisição HTTP

// Definindo a interface para o perfil do usuário
interface UserProfile {
  name: string;
  age: number;
  cep: string;
  street: string;
  email: string;
  isTreinador?: boolean;  // O campo isTreinador pode ser opcional
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  age: number | null = null; // Nova propriedade para idade
  cep: string = '';
  street: string = ''; // Rua
  showPassword: boolean = false;
  isRegistering: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private toastController: ToastController,
    private http: HttpClient
  ) {}

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    toast.present();
  }

  buscarCep() {
    if (this.cep.length === 8) {
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

  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    // Buscar o perfil do usuário no Firestore para verificar se ele é um treinador
    const userDoc = await this.firestore.collection('users').doc(userId).get().toPromise();
    return userDoc?.data() as UserProfile;  // Garantir que o retorno é tratado como UserProfile
  }

  login() {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        if (user) {
          // Verificar se o usuário tem o campo 'isTreinador' no Firestore
          const userProfile = await this.getUserProfile(user.uid);

          if (userProfile && userProfile.isTreinador === true) {
            // Se o usuário for treinador, redireciona para a página de atualizações dos treinos
            this.router.navigate(['/treinos']);  // Ajuste o caminho conforme a sua página
          } else {
            // Caso contrário, redireciona para a página do aluno (Home)
            this.router.navigate(['/home']);
          }

          this.presentToast('Login bem-sucedido!', 'success');
        }
      })
      .catch((error) => {
        this.presentToast(`Erro no login: ${error.message}`, 'danger');
      });
  }

  register() {
    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          const userId = user.uid;
          this.firestore.collection('users').doc(userId).set({
            name: this.name,
            age: this.age,
            cep: this.cep,
            street: this.street,
            email: this.email  // Adicionando o e-mail ao Firestore
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
  }
}
