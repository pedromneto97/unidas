import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Finalidade} from "../model/finalidade";
import {FinalidadeService} from "../services/finalidade.service";

@Injectable()
export class FinalidadeResolver implements Resolve<Finalidade> {
  constructor(private finalidade: FinalidadeService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const id = route.params['id'];
    if (id != null) {
      return this.finalidade.getFinalidade(id);
    } else {
      return this.finalidade.getFinalidades();
    }
  }
}
