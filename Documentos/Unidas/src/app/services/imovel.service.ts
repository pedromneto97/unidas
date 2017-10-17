import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ImovelService {
  url: string;
  header: Headers;

  constructor(private http: Http) {
    this.url = 'http://localhost:8000/api/imovel';
    this.header = new Headers({
      'Content-Type': 'application/json'
    });
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
