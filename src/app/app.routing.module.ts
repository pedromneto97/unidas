import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guard/auth.guard";
import {RotaGuard} from "./guard/rota.guard";


const appRoutes: Routes = [
  {path: '', loadChildren: 'app/pages/public/public.module#PublicModule'},
  {path: 'auth', loadChildren: 'app/pages/auth/auth.module#AuthModule', canActivate: [RotaGuard]},
  {path: 'admin', loadChildren: 'app/pages/admin/admin.module#AdminModule', canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {enableTracing: false})],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
