import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Imovel} from '../model/imovel';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ImovelService {
  url: string;
  header: HttpHeaders;
  token: any;

  constructor(private http: HttpClient) {
    this.url = `http://${window.location.hostname}/api/imovel`;
    this.header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.token = localStorage.getItem('API_TOKEN');
  }

  getImoveis(): Observable<HttpResponse<Imovel[]>> {
    const url = `${this.url}/`;
    return this.http.get(url, {headers: this.header})
      .map((response: HttpResponse<Imovel[]>) => response)
      .catch(this.handleError);
  }

  getImovel(id: number) {
    const url = `${this.url}/${id}`;
    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then((response: HttpResponse<Imovel>) => response)
      .catch(this.handleError);
  }

  getFinalidade(id: number) {
    const url = `${this.url}/finalidade/${id}`;
    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then((response: HttpResponse<Imovel>) => response)
      .catch(this.handleError);
  }

  getTipo(id: number) {
    const url = `${this.url}/tipo/${id}`;
    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then((response: HttpResponse<Imovel>) => response)
      .catch(this.handleError);
  }

  getTipoFinalidade(idtipo: number, idfinalidade: number) {
    const url = `${this.url}/busca/${idtipo}/${idfinalidade}`;
    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then((response: HttpResponse<Imovel>) => response)
      .catch(this.handleError);
  }

  store(formulario) {
    const url = `${this.url}`;
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(url, formulario, {headers: headers})
      .toPromise()
      .then((response: HttpResponse<Imovel>) => response)
      .catch(this.handleError);
  }

  update(id: number, formulario) {
    const url = `${this.url}/${id}`;
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put(url, formulario, {headers: headers})
      .toPromise()
      .then((response: HttpResponse<Imovel>) => response)
      .catch(this.handleError);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    const url = `${this.url}/${id}`;
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete(url, {headers: headers})
      .map((response: HttpResponse<any>) => response);
  }

  handleError(error: any): Promise<any> {
    if (error.status === 200) {
      return Promise.reject('Nenhuma');
    }
    if (error.status === 401) {
      return Promise.reject('Unauthorized');
    }
    if (error.status === 403) {
      return Promise.reject('Forbidden');
    }
    return Promise.reject(error);
  }
}
