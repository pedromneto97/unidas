import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {InicialComponent} from "./inicial/inicial.component";
import {AdminComponent} from "./admin.component";

const routes: Routes = [{
  path: '', component: AdminComponent, children: [
    {path: '', component: InicialComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
