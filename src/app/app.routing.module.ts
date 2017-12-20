import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guard/auth.guard";
import {RotaGuard} from "./guard/rota.guard";
import {TipoResolver} from "./guard/tipo.resolver";
import {FinalidadeResolver} from "./guard/finalidade.resolver";


const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/pages/public/public.module#PublicModule',
    resolve: {tipo: TipoResolver, finalidade: FinalidadeResolver}
  },
  {path: 'auth', loadChildren: 'app/pages/auth/auth.module#AuthModule', canActivate: [RotaGuard]},
  {
    path: 'admin',
    loadChildren: 'app/pages/admin/admin.module#AdminModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {enableTracing: false})],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
