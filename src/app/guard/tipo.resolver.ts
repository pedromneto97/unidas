import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Tipo} from "../model/tipo";
import {TipoService} from "../services/tipo.service";

@Injectable()
export class TipoResolver implements Resolve<Tipo> {
  constructor(private tipo: TipoService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const id = route.params['id'];
    if (id != null) {
      return this.tipo.getTipo(id);
    } else {
      return this.tipo.getTipos();
    }
  }
}
