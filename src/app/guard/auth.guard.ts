import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.Logado())
      return true;
    this.router.navigate(['/auth/login']);
    return false;
  }

  canLoad(route: Router): Observable<boolean> | boolean {
    if (this.Logado())
      return true;
    this.router.navigate(['/auth/login']);
    return false;
  }

  private Logado() {
    if (localStorage.getItem('API_TOKEN'))
      return true;
    else
      return false;
  }
}
