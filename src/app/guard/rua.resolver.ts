import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Rua} from "../model/rua";
import {RuaService} from "../services/rua.service";

@Injectable()
export class RuaResolver implements Resolve<Rua> {

  constructor(private rua: RuaService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const id = route.params['id'];
    if (id != null) {
      return this.rua.getRua(id);
    } else {
      return this.rua.getRuas();
    }
  }
}
