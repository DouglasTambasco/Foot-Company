import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-treino-semanal',
  templateUrl: './treino-semanal.page.html',
  styleUrls: ['./treino-semanal.page.scss'],
})
export class TreinoSemanalPage implements OnInit {
  treinos!: Observable<any[]>;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    // Obtendo os dados da coleção "treinos" do Firestore e ordenando de forma descendente
    this.treinos = this.firestore.collection('treinos').valueChanges().pipe(
      map(treinoData => treinoData.reverse()) // Reverte a ordem dos treinos
    );
  }
}
