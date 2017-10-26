import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const appRoutes: Routes = [
  {path: '', loadChildren: 'app/pages/public/public.module#PublicModule'},
  {path: 'auth', loadChildren: 'app/pages/auth/auth.module#AuthModule'},
  {path: 'admin', loadChildren: 'app/pages/admin/admin.module#AdminModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {enableTracing: false})],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
