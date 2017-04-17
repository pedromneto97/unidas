import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ImoveisService {
  constructor(private http: Http) {
  }

  busca(finalidade, tipo): Observable<any> | any {
    const url = 'http://localhost/novounidas/gui/imovel.php';
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(url, {finalidade: finalidade, tipo: tipo}, headers).map(
      function (response: Response) {
        console.log(response.json().data);
        return response.json().data || {};
      }).catch(
      function (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return Observable.throw(errMsg);
      }
    ).subscribe(data => console.log(data));
  }

  getImoveis() {
    return ['imovel1', 'imovel2', 'imovel3'];
  }

}
