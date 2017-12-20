import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


import {AdminRoutingModule} from './admin-routing.module';
import {InicialComponent} from './inicial/inicial.component';
import {AdminComponent} from "./admin.component";
import {ListaImovelComponent} from "./imoveis/lista/lista.component";
import {NovoImovelComponent} from './imoveis/novo/novo.component';
import {EditarImovelComponent} from './imoveis/editar/editar.component';

import {ImovelService} from "../../services/imovel.service";
import {RuaService} from "../../services/rua.service";
import {CidadeService} from "../../services/cidade.service";
import {EstadoService} from "../../services/estado.service";
import {BairroService} from "../../services/bairro.service";

import {FormCanDeactivateGuard} from "../../guard/form-can-deactivate.guard";
import {AuthService} from "../../services/auth.service";

import {EditarRuaComponent} from './ruas/editar/editar.component';
import {ListaRuaComponent} from './ruas/lista/lista.component';
import {RuaResolver} from "../../guard/rua.resolver";

import {ListaBairroComponent} from './bairros/lista/lista.component';
import {EditarBairroComponent} from './bairros/editar/editar.component';
import {BairroResolver} from "../../guard/bairro.resolver";

import {ListaCidadeComponent} from "./cidades/lista/lista.component";
import {EditarCidadeComponent} from "./cidades/editar/editar.component";
import {CidadeResolver} from "../../guard/cidade.resolver";

import {ListaEstadoComponent} from "./estados/lista/lista.component";
import {EditarEstadoComponent} from "./estados/editar/editar.component";
import {EstadoResolver} from "../../guard/estado.resolver";

import {ListaTipoComponent} from './tipos/lista/lista.component';
import {NovoTipoComponent} from './tipos/novo/novo.component';
import {EditarTipoComponent} from './tipos/editar/editar.component';

import {ListaFinalidadeComponent} from "./finalidades/lista/lista.component";
import {EditarFinalidadeComponent} from "./finalidades/editar/editar.component";
import {NovoFinalidadeComponent} from "./finalidades/novo/novo.component";

import {ListaInteresseComponent} from './interesses/lista/lista.component';
import {TodosInteresseComponent} from './interesses/todos/todos.component';
import {InteresseComponent} from './interesses/interesse/interesse.component';
import {InteresseResolver} from "../../guard/interesse.resolver";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    AdminComponent,
    InicialComponent,
    ListaImovelComponent,
    NovoImovelComponent,
    EditarImovelComponent,
    EditarRuaComponent,
    ListaRuaComponent,
    ListaBairroComponent,
    EditarBairroComponent,
    ListaCidadeComponent,
    EditarCidadeComponent,
    ListaEstadoComponent,
    EditarEstadoComponent,
    ListaFinalidadeComponent,
    EditarFinalidadeComponent,
    NovoFinalidadeComponent,
    ListaTipoComponent,
    EditarTipoComponent,
    NovoTipoComponent,
    ListaInteresseComponent,
    TodosInteresseComponent,
    InteresseComponent

  ],
  providers: [
    ImovelService,
    FormCanDeactivateGuard,
    RuaService,
    AuthService,
    CidadeService,
    EstadoService,
    BairroService,
    RuaResolver,
    BairroResolver,
    CidadeResolver,
    EstadoResolver,
    InteresseResolver
  ]
})
export class AdminModule {
}
