import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {InicialComponent} from "./inicial/inicial.component";
import {AdminComponent} from "./admin.component";
import {ImoveisComponent} from "./imoveis/imoveis.component";
import {NovoimovelComponent} from "./novoimovel/novoimovel.component";

const routes: Routes = [{
  path: '', component: AdminComponent, children: [
    {path: '', component: InicialComponent},
    {path: 'imoveis', component: ImoveisComponent},
    {path: 'novoimovel', component: NovoimovelComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
