import {Observable, of as observableOf} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';


import {Imovel} from '../model/imovel';
import {ImovelService} from '../services/imovel.service';

@Injectable()
export class ImovelResolver implements Resolve<Imovel> {
  constructor(private imovel: ImovelService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const id = route.params['id'];
    const tipo = route.params['tipo'];
    const finalidade = route.params['finalidade'];
    if (tipo != null) {
      if (finalidade != null) {
        return this.imovel.getTipoFinalidade(tipo, finalidade);
      } else {
        // Somente tipo
        return this.imovel.getTipo(tipo);
      }
    } else {
      if (finalidade != null) {
        // Somente Finalidade
        this.imovel.getFinalidade(finalidade);
      }
    }
    if (id != null) {
      return this.imovel.getImovel(id);
    } else {
      return this.imovel.getImoveis().pipe(map(resp => {
        return resp;
      }), catchError(err => {
        console.log(err);
        return observableOf(null);
      }),);
    }
  }
}
