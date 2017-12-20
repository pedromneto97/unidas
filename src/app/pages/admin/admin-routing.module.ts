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
import {RuaResolver} from "../../guard/rua.resolver";
import {BairroResolver} from "../../guard/bairro.resolver";
import {CidadeResolver} from "../../guard/cidade.resolver";
import {EstadoResolver} from "../../guard/estado.resolver";
import {TipoResolver} from "../../guard/tipo.resolver";
import {ListaTipoComponent} from "./tipos/lista/lista.component";
import {EditarTipoComponent} from "./tipos/editar/editar.component";
import {NovoTipoComponent} from "./tipos/novo/novo.component";
import {ListaFinalidadeComponent} from "./finalidades/lista/lista.component";
import {FinalidadeResolver} from "../../guard/finalidade.resolver";
import {EditarFinalidadeComponent} from "./finalidades/editar/editar.component";
import {NovoFinalidadeComponent} from "./finalidades/novo/novo.component";
import {ListaInteresseComponent} from "./interesses/lista/lista.component";
import {InteresseResolver} from "../../guard/interesse.resolver";
import {TodosInteresseComponent} from "./interesses/todos/todos.component";
import {InteresseComponent} from "./interesses/interesse/interesse.component";

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
    {path: 'ruas/lista', component: ListaRuaComponent, resolve: {rua: RuaResolver}},
    {
      path: 'ruas/editar/:id',
      component: EditarRuaComponent,
      resolve: {rua: RuaResolver},
      canDeactivate: [FormCanDeactivateGuard]
    },

    {path: 'bairros', redirectTo: 'bairros/lista'},
    {path: 'bairros/lista', component: ListaBairroComponent, resolve: {bairro: BairroResolver}},
    {
      path: 'bairros/editar/:id',
      component: EditarBairroComponent,
      resolve: {bairro: BairroResolver},
      canDeactivate: [FormCanDeactivateGuard]
    },

    {path: 'cidades', redirectTo: 'cidades/lista'},
    {path: 'cidades/lista', component: ListaCidadeComponent, resolve: {cidade: CidadeResolver}},
    {
      path: 'cidades/editar/:id',
      component: EditarCidadeComponent,
      resolve: {cidade: CidadeResolver},
      canDeactivate: [FormCanDeactivateGuard]
    },

    {path: 'estados', redirectTo: 'estados/lista'},
    {path: 'estados/lista', component: ListaEstadoComponent, resolve: {estado: EstadoResolver}},
    {
      path: 'estados/editar/:id',
      component: EditarEstadoComponent,
      resolve: {estado: EstadoResolver},
      canDeactivate: [FormCanDeactivateGuard]
    },

    {path: 'tipos', redirectTo: 'tipos/lista'},
    {path: 'tipos/lista', component: ListaTipoComponent, resolve: {tipo: TipoResolver}},
    {
      path: 'tipos/editar/:id',
      component: EditarTipoComponent,
      resolve: {tipo: TipoResolver},
      canDeactivate: [FormCanDeactivateGuard]
    },
    {path: 'tipos/novo', component: NovoTipoComponent, canDeactivate: [FormCanDeactivateGuard]},

    {path: 'finalidades', redirectTo: 'finalidades/lista'},
    {path: 'finalidades/lista', component: ListaFinalidadeComponent, resolve: {finalidade: FinalidadeResolver}},
    {
      path: 'finalidades/editar/:id',
      component: EditarFinalidadeComponent,
      resolve: {finalidade: FinalidadeResolver},
      canDeactivate: [FormCanDeactivateGuard]
    },
    {path: 'finalidades/novo', component: NovoFinalidadeComponent, canDeactivate: [FormCanDeactivateGuard]},

    {path: 'interesses', redirectTo: 'interesses/lista'},
    {path: 'interesses/lista', component: ListaInteresseComponent, resolve: {interesse: InteresseResolver}},
    {path: 'interesses/todos', component: TodosInteresseComponent, resolve: {interesse: InteresseResolver}},
    {path: 'interesses/interesse/:id', component: InteresseComponent, resolve: {interesse: InteresseResolver}},


    {path: '/**', redirectTo: ''}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
