import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

export interface FormCanDeactivate {
  CanDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class FormCanDeactivateGuard implements CanDeactivate<FormCanDeactivate> {
  canDeactivate(component: FormCanDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return component.CanDeactivate ? component.CanDeactivate() : true;
  }
}
