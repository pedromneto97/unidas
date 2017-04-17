import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {PagesComponent} from "./pages.component";
import {HomeComponent} from "./home/home.component";
import {EmpresaComponent} from "./empresa/empresa.component";
import {RegraslocacaoComponent} from "./regraslocacao/regraslocacao.component";
import {ImovelComponent} from "./imovel/imovel.component";
import {ImoveisComponent} from "./imoveis/imoveis.component";

const pagesRoutes: Routes = [{
  path: '', component: PagesComponent, children: [
    {path: 'home', component: HomeComponent},
    {path: 'empresa', component: EmpresaComponent},
    {path: 'regraslocacao', component: RegraslocacaoComponent},
    {path: 'imovel', component: ImovelComponent},
    {path: 'imoveis', component: ImoveisComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})

export class PagesRoutingModule {
}
