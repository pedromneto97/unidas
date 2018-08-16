import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Cidade} from '../model/cidade';
import {CidadeService} from '../services/cidade.service';

@Injectable()
export class CidadeResolver implements Resolve<Cidade> {

  constructor(private cidade: CidadeService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const id = route.params['id'];
    if (id != null) {
      return this.cidade.getCidade(id);
    } else {
      return this.cidade.getCidades();
    }
  }
}
