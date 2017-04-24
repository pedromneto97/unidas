import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Imovel} from '../../app.component';

@Injectable()
export class ImoveisService {
  constructor(private http: Http) {
  }

  busca(finalidade, tipo): Observable<Imovel[]> | any {
    const url = 'http://localhost/novounidas/gui/imovel.php';
    // const headers = new Headers({'Content-Type': 'application/json'});
    // const options = new RequestOptions({headers: headers});

    return this.http.post(url, {finalidade: finalidade, tipo: tipo})
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
