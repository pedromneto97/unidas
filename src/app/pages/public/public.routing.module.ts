import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {EmpresaComponent} from './empresa/empresa.component';
import {RegraslocacaoComponent} from './regraslocacao/regraslocacao.component';
import {ImovelComponent} from './imovel/imovel.component';
import {ImoveisComponent} from './imoveis/imoveis.component';
import {PublicComponent} from './public.component';
import {ImovelResolver} from '../../guard/imovel.resolver';
import {TipoResolver} from '../../guard/tipo.resolver';
import {FinalidadeResolver} from '../../guard/finalidade.resolver';
import {SearchComponent} from './search/search.component';

const routes: Routes = [{
  path: '', component: PublicComponent, children: [
    {path: '', component: HomeComponent, resolve: {imovel: ImovelResolver}},
    {path: 'empresa', component: EmpresaComponent},
    {path: 'regraslocacao', component: RegraslocacaoComponent},
    {path: 'imovel/:id', component: ImovelComponent, resolve: {imovel: ImovelResolver}},
    {
      path: 'imoveis/:tipo/:finalidade',
      component: ImoveisComponent,
      resolve: {imovel: ImovelResolver, tipo: TipoResolver, finalidade: FinalidadeResolver}
    },
    {path: 'imoveis/:tipo', component: ImoveisComponent, resolve: {imovel: ImovelResolver, tipo: TipoResolver}},
    {
      path: 'busca', component: SearchComponent,
      resolve: {
        imovel: ImovelResolver
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
