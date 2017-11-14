import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RuaService {
  url: string;
  header: Headers;

  constructor(private http: Http) {
    this.url = 'http://localhost:8000/api/rua';
    this.header = new Headers({
      'Content-Type': 'application/json'
    });
  }

  getCEP(cep): Promise<any> | any {
    const headers = new Headers({
      'Accept': 'application/json'
    });
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get(url, {headers: headers})
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
