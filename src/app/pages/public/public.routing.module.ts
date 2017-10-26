import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {EmpresaComponent} from "./empresa/empresa.component";
import {RegraslocacaoComponent} from "./regraslocacao/regraslocacao.component";
import {ImovelComponent} from "./imovel/imovel.component";
import {ImoveisComponent} from "./imoveis/imoveis.component";
import {PublicComponent} from "./public.component";

const routes: Routes = [{
  path: '', component: PublicComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'empresa', component: EmpresaComponent},
    {path: 'regraslocacao', component: RegraslocacaoComponent},
    {path: 'imovel/:id', component: ImovelComponent},
    {path: 'imoveis/:tipo/:finalidade', component: ImoveisComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
