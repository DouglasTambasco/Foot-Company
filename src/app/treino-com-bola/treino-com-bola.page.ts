import { Component } from '@angular/core';

@Component({
  selector: 'app-treino-com-bola',
  templateUrl: './treino-com-bola.page.html',
  styleUrls: ['./treino-com-bola.page.scss'],
})
export class TreinoComBolaPage {

  atividades = [
    {
      nome: 'Coletivo',
      tempo: '30 minutos',
      imgUrl: 'assets/img/coletivo.png' // Substituir com a imagem correta
    },
    {
      nome: 'Cob. de Falta',
      tempo: '20 minutos',
      imgUrl: 'assets/img/cob-falta.png' // Substituir com a imagem correta
    },
    {
      nome: 'Cob. de Escanteio',
      tempo: '25 minutos',
      imgUrl: 'assets/img/cob-escanteio.png' // Substituir com a imagem correta
    },
    {
      nome: 'Pênaltis',
      tempo: '15 minutos',
      imgUrl: 'assets/img/penaltis.png' // Substituir com a imagem correta
    }
  ];

  constructor() { }

}
