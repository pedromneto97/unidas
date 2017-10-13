import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

export interface FormCanDeactivate {
  FormCanDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class FormCanDeactivateGuard implements CanDeactivate<FormCanDeactivate> {
  canDeactivate(component: FormCanDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return component.FormCanDeactivate ? component.FormCanDeactivate() : true;
  }
}
