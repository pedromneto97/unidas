import {Injectable} from '@angular/core';
import {Headers, Http, Response} from "@angular/http";

@Injectable()
export class InteresseService {
  url: string;
  token: any;
  header: Headers;

  constructor(private http: Http) {
    this.url = 'http://localhost:8000/api/interesse';
    this.header = new Headers({
      'Content-Type': 'application/json'
    });
    this.token = localStorage.getItem('API_TOKEN');
  }

  getInteresse(id: number) {
    const url = `${this.url}/${id}`;
    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then((response: Response) => response.json())
      .catch(this.handleError);
  }

  getInteresses() {
    const url = `${this.url}`;
    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then((response: Response) => response.json())
      .catch(this.handleError);
  }

  getImovelInteresses(id: number) {
    const url = `${this.url}/imovel/${id}`;
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
