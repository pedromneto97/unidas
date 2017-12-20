import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Interesse} from "../model/interesse";
import {InteresseService} from "../services/interesse.service";

@Injectable()
export class InteresseResolver implements Resolve<Interesse> {
  constructor(private interesse: InteresseService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const id = route.params['id'];
    if (id != null) {
      return this.interesse.getInteresse(id);
    } else {
      return this.interesse.getInteresses();
    }
  }
}
