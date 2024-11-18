import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

interface UserProfile {
  name?: string;
  email?: string;
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
  profileImageUrl: string | null = null; // URL da imagem do perfil

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
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
          this.userEmail = profile.email ?? '';
          this.userCep = profile.cep ?? '';
          this.loadProfileImage(user.uid); // Carregar a imagem do perfil
        }
      });
    }
  }

  async loadProfileImage(userId: string) {
    const imageRef = this.storage.ref(`profilePictures/${userId}/profile.jpg`);
    imageRef.getDownloadURL().subscribe(url => {
      this.profileImageUrl = url; // Atualizar a URL da imagem do perfil
    }, error => {
      console.error('Erro ao carregar a imagem do perfil:', error);
      this.profileImageUrl = null; // Define como null se houver erro
    });
  }

  async selectAndUploadPhoto() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const user = await this.afAuth.currentUser;
        if (user) {
          const imagePath = `profilePictures/${user.uid}/profile.jpg`;
          const fileRef = this.storage.ref(imagePath);
          const task = this.storage.upload(imagePath, file);

          task.snapshotChanges().pipe(
            finalize(() => {
              this.loadProfileImage(user.uid); // Carregar imagem após o upload
            })
          ).subscribe();

          this.presentToast('Upload da foto em andamento...', 'success');
        }
      } else {
        this.presentToast('Nenhum arquivo selecionado', 'danger');
      }
    };
    fileInput.click();
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
      } catch (error: any) {
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
