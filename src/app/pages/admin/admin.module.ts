import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {InicialComponent} from './inicial/inicial.component';
import {AdminComponent} from "./admin.component";
import {ImoveisComponent} from "./imoveis/imoveis.component";
import {ImovelService} from "../../services/imovel.service";
import { NovoimovelComponent } from './novoimovel/novoimovel.component';
import { EditarimovelComponent } from './editarimovel/editarimovel.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    InicialComponent,
    ImoveisComponent,
    NovoimovelComponent,
    EditarimovelComponent
  ],
  providers: [
    ImovelService
  ]
})
export class AdminModule {
}
