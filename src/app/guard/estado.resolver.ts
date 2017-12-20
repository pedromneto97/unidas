import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {EstadoService} from "../services/estado.service";
import {Estado} from "../model/estado";

@Injectable()
export class EstadoResolver implements Resolve<Estado> {

  constructor(private estado: EstadoService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const id = route.params['id'];
    if (id != null) {
      return this.estado.getEstado(id);
    } else {
      return this.estado.getEstados();
    }
  }
}
