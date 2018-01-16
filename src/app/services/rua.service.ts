import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Rua} from "../model/rua";

@Injectable()
export class RuaService {
  url: string;
  token: any;
  header: HttpHeaders;

  constructor(private http: HttpClient) {
    this.url = `${window.location.hostname}/api/rua`;
    this.header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.token = localStorage.getItem('API_TOKEN');
  }

  getCEP(cep): Promise<any> | any {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      //'Authorization': 'Token token=2cc886faaad3ed3a320e82b9c9e69651'
    });
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    //const url = `http://www.cepaberto.com/api/v2/ceps.json?cep=${cep}`;
    return this.http.get(url, {headers: headers})
      .toPromise()
      .then((response: HttpResponse<any>) => response)
      .catch(this.handleError);
  }

  cep(cep) {
    const url = `${this.url}/cep/${cep}`;
    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then((response: HttpResponse<Rua>) => response)
      .catch(this.handleError);
  }

  getRua(id) {
    const url = `${this.url}/${id}`;
    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then((response: HttpResponse<Rua>) => response)
      .catch(this.handleError);
  }

  getRuas() {
    const url = `${this.url}`;
    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then((response: HttpResponse<Rua>) => response)
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
      .then((response: HttpResponse<Rua>) => response)
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
      .then((response: HttpResponse<Rua>) => response)
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
