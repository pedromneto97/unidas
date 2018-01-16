import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Imovel} from '../model/imovel';

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

  getImoveis() {
    const url = `${this.url}/todos`;
    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then((response: HttpResponse<Imovel>) => response)
      .catch(this.handleError);
  }

  getImoveisLimite() {
    return this.http.get(this.url, {headers: this.header})
      .toPromise()
      .then((response: HttpResponse<Imovel>) => response)
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

  delete(id: number) {
    const url = `${this.url}/${id}`;
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete(url, {headers: headers})
      .toPromise()
      .then((response: HttpResponse<any>) => response)
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    if (error.status === 401) {
      return Promise.reject('Unauthorized');
    }
    if (error.status === 403) {
      return Promise.reject('Forbidden');
    }
    return Promise.reject(error);
  }
}
