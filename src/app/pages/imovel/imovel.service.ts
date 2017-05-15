import {Injectable} from '@angular/core';

import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Imovel} from '../../app.component';

@Injectable()
export class ImovelService {

  constructor(private http: Http) {
  }

  busca(id: number): Observable<Imovel[]> | any {
    const url = 'http://localhost/novounidas/gui/imovel.php';
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(url, {id: id}, options)
      .map((res: Response) => res.json());
  }

  interesse(nome: string, celular: number, email: string): any {
    const url = 'http://localhost/novounidas/gui/interesse.php';
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(url, {nome, celular, email}, options);
  }
}
