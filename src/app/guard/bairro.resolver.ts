import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Bairro} from "../model/bairro";
import {BairroService} from "../services/bairro.service";

@Injectable()
export class BairroResolver implements Resolve<Bairro> {

  constructor(private bairro: BairroService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const id = route.params['id'];
    if (id != null) {
      return this.bairro.getBairro(id);
    } else {
      return this.bairro.getBairros();
    }
  }
}
