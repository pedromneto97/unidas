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
import {FinalidadeService} from "../../services/finalidade.service";
import {TipoService} from "../../services/tipo.service";

import {FormCanDeactivateGuard} from "../../guard/form-can-deactivate.guard";
import {AuthService} from "../../services/auth.service";

import {EditarRuaComponent} from './ruas/editar/editar.component';
import {ListaRuaComponent} from './ruas/lista/lista.component';

import {ListaBairroComponent} from './bairros/lista/lista.component';
import {EditarBairroComponent} from './bairros/editar/editar.component';

import {ListaCidadeComponent} from "./cidades/lista/lista.component";
import {EditarCidadeComponent} from "./cidades/editar/editar.component";

import {ListaEstadoComponent} from "./estados/lista/lista.component";
import {EditarEstadoComponent} from "./estados/editar/editar.component";

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
    EditarEstadoComponent

  ],
  providers: [
    ImovelService,
    FormCanDeactivateGuard,
    RuaService,
    AuthService,
    CidadeService,
    EstadoService,
    BairroService,
    FinalidadeService,
    TipoService
  ]
})
export class AdminModule {
}
