import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'gym', loadChildren: () => import('./gym/gym.module').then(m => m.GymPageModule) },
  { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule) },
  { path: 'mensagem', loadChildren: () => import('./mensagem/mensagem.module').then(m => m.MensagemPageModule) },
  { path: 'treinos', loadChildren: () => import('./treinos/treinos.module').then(m => m.TreinosPageModule) },
  { path: 'treino-com-bola', loadChildren: () => import('./treino-com-bola/treino-com-bola.module').then(m => m.TreinoComBolaPageModule) },
  { path: 'academia', loadChildren: () => import('./academia/academia.module').then(m => m.AcademiaPageModule) },
  { path: 'trabalho-sem-bola', loadChildren: () => import('./trabalho-sem-bola/trabalho-sem-bola.module').then(m => m.TrabalhoSemBolaPageModule) },
  {
    path: 'treinos',
    loadChildren: () => import('./treinos/treinos.module').then( m => m.TreinosPageModule)
  },
  {
    path: 'treino-semanal',
    loadChildren: () => import('./treino-semanal/treino-semanal.module').then( m => m.TreinoSemanalPageModule)
  },
  {
    path: 'adicionar-jogo',
    loadChildren: () => import('./adicionar-jogo/adicionar-jogo.module').then( m => m.AdicionarJogoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
