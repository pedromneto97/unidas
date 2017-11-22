import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


import {AdminRoutingModule} from './admin-routing.module';
import {InicialComponent} from './inicial/inicial.component';
import {AdminComponent} from "./admin.component";
import {ImoveisComponent} from "./imoveis/imoveis.component";
import {NovoimovelComponent} from './novoimovel/novoimovel.component';
import {EditarimovelComponent} from './editarimovel/editarimovel.component';

import {ImovelService} from "../../services/imovel.service";

import {FormCanDeactivateGuard} from "../../guard/form-can-deactivate.guard";
import {RuaService} from "../../services/rua.service";
import {AuthService} from "../../services/auth.service";
import {CidadeService} from "../../services/cidade.service";
import {EstadoService} from "../../services/estado.service";
import {BairroService} from "../../services/bairro.service";
import {FinalidadeService} from "../../services/finalidade.service";
import {TipoService} from "../../services/tipo.service";

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
    ImoveisComponent,
    NovoimovelComponent,
    EditarimovelComponent
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
