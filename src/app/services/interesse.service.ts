import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Interesse} from "../model/interesse";

@Injectable()
export class InteresseService {
  url: string;
  token: any;
  header: HttpHeaders;

  constructor(private http: HttpClient) {
    this.url = `http://${window.location.hostname}/api/interesse`;
    this.header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.token = localStorage.getItem('API_TOKEN');
  }

  getInteresse(id: number) {
    const url = `${this.url}/${id}`;
    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then((response: HttpResponse<Interesse>) => response)
      .catch(this.handleError);
  }

  getInteresses() {
    const url = `${this.url}`;
    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then((response: HttpResponse<Interesse>) => response)
      .catch(this.handleError);
  }

  getImovelInteresses(id: number) {
    const url = `${this.url}/imovel/${id}`;
    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then((response: HttpResponse<Interesse>) => response)
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
      .then((response: HttpResponse<Interesse>) => response)
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
      .then((response: HttpResponse<Interesse>) => response)
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
