import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Promise<boolean> | boolean {
    return new Promise<boolean>(resolve => {
      if (this.Logado()) {
        resolve(true);
      } else {
        this.router.navigate(['/auth/login']);
        resolve(false);
      }
    });
  }

  canLoad(route: Route): Promise<boolean> | boolean {
    return new Promise<boolean>(resolve => {
      if (this.Logado()) {
        resolve(true);
      } else {
        this.router.navigate(['/auth/login']);
        resolve(false);
      }
    });
  }

  private Logado() {
    if (localStorage.getItem('API_TOKEN'))
      return true;
    else
      return false;
  }
}
