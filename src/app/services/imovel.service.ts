import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ImovelService {
  url: string;
  header: Headers;
  token: any;

  constructor(private http: Http) {
    this.url = 'http://localhost:8000/api/imovel';
    this.header = new Headers({
      'Content-Type': 'application/json'
    });
    this.token = localStorage.getItem('API_TOKEN');
  }

  getImoveis() {
    return this.http.get(this.url, {headers: this.header})
      .toPromise()
      .then((response: Response) => response.json())
      .catch(this.handleError);
  }

  getImovel(id: number) {
    const url = `${this.url}/${id}`;
    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then((response: Response) => response.json())
      .catch(this.handleError);
  }

  getFinalidade(id: number) {
    const url = `${this.url}/finalidade/${id}`;
    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then((response: Response) => response.json())
      .catch(this.handleError);
  }

  getTipo(id: number) {
    const url = `${this.url}/tipo/${id}`;
    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then((response: Response) => response.json())
      .catch(this.handleError);
  }

  getTipoFinalidade(idtipo: number, idfinalidade: number) {
    const url = `${this.url}/busca/${idtipo}/${idfinalidade}`;
    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then((response: Response) => response.json())
      .catch(this.handleError);
  }

  store(formulario) {
    const url = `${this.url}`;
    const headers = new Headers({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(url, formulario, {headers: this.header})
      .toPromise()
      .then((response: Response) => response.json())
      .catch(this.handleError);
  }

  update(id: number, formulario) {
    const url = `${this.url}/${id}`;
    const headers = new Headers({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put(url, formulario, {headers: this.header})
      .toPromise()
      .then((response: Response) => response.json())
      .catch(this.handleError);
  }

  delete(id: number) {
    const url = `${this.url}/${id}`;
    const headers = new Headers({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete(url, {headers: this.header})
      .toPromise()
      .then((response: Response) => response.json())
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
