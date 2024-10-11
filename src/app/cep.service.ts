import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  private apiUrl = 'https://viacep.com.br/ws';  // API de CEP ViaCEP

  constructor(private http: HttpClient) {}

  // Método para buscar endereço pelo CEP
  buscarCep(cep: string): Observable<any> {
    const url = `${this.apiUrl}/${cep}/json/`;
    return this.http.get(url);
  }
}
