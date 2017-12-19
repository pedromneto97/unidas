import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormCanDeactivateGuard} from "../../guard/form-can-deactivate.guard";
import {ImovelResolver} from "../../guard/imovel.resolver";

import {InicialComponent} from "./inicial/inicial.component";
import {AdminComponent} from "./admin.component";

import {ListaRuaComponent} from "./ruas/lista/lista.component";
import {EditarRuaComponent} from "./ruas/editar/editar.component";
import {EditarImovelComponent} from "./imoveis/editar/editar.component";
import {ListaImovelComponent} from "./imoveis/lista/lista.component";
import {NovoImovelComponent} from "./imoveis/novo/novo.component";
import {EditarBairroComponent} from "./bairros/editar/editar.component";
import {ListaBairroComponent} from "./bairros/lista/lista.component";
import {ListaCidadeComponent} from "./cidades/lista/lista.component";
import {EditarCidadeComponent} from "./cidades/editar/editar.component";
import {ListaEstadoComponent} from "./estados/lista/lista.component";
import {EditarEstadoComponent} from "./estados/editar/editar.component";

const routes: Routes = [{
  path: '', component: AdminComponent, children: [
    {path: '', component: InicialComponent},

    {path: 'imoveis', redirectTo: 'imoveis/lista'},
    {path: 'imoveis/lista', component: ListaImovelComponent, resolve: {imovel: ImovelResolver}},
    {path: 'imoveis/novo', component: NovoImovelComponent, canDeactivate: [FormCanDeactivateGuard]},
    {
      path: 'imoveis/editar/:id',
      component: EditarImovelComponent,
      canDeactivate: [FormCanDeactivateGuard],
      resolve: {imovel: ImovelResolver},
    },

    {path: 'ruas', redirectTo: 'ruas/lista'},
    {path: 'ruas/lista', component: ListaRuaComponent},
    {path: 'ruas/editar/:id', component: EditarRuaComponent},

    {path: 'bairros', redirectTo: 'bairros/lista'},
    {path: 'bairros/lista', component: ListaBairroComponent},
    {path: 'bairros/editar/:id', component: EditarBairroComponent},

    {path: 'cidades', redirectTo: 'cidades/lista'},
    {path: 'cidades/lista', component: ListaCidadeComponent},
    {path: 'cidades/editar/:id', component: EditarCidadeComponent},

    {path: 'estados', redirectTo: 'estados/lista'},
    {path: 'estados/lista', component: ListaEstadoComponent},
    {path: 'estados/editar/:id', component: EditarEstadoComponent},

    {path: '/**', redirectTo: ''}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
