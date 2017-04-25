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

  busca(finalidade: number, tipo: number): Observable<Imovel[]> | any {
    const url = 'http://localhost/novounidas/gui/imovel.php';
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(url, {finalidade: finalidade, tipo: tipo}, options)
      .map((res: Response) => res.json());
    // return this.http.post(url, {finalidade: finalidade, tipo: tipo}, options)
    //   .subscribe((response: Response) => {
    //     console.log(response.json());
    //   });
  }
}
