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
    AuthService
  ]
})
export class AdminModule {
}
