import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {PagesRoutingModule} from './pages.routing.module';

import {HomeComponent} from './home/home.component';
import {EmpresaComponent} from './empresa/empresa.component';
import {PagesComponent} from './pages.component';
import {RegraslocacaoComponent} from './regraslocacao/regraslocacao.component';
import {ImovelComponent} from './imovel/imovel.component';
import {ImoveisComponent} from './imoveis/imoveis.component';
import {ImoveisService} from './imoveis/imoveis.service';
import {ImovelService} from './imovel/imovel.service';
import {HomeService} from './home/home.service';
import {CamelCasePipe} from "../pipes/camel-case.pipe";

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpModule,
    JsonpModule,
    FormsModule
  ],
  declarations: [
    PagesComponent,
    HomeComponent,
    EmpresaComponent,
    RegraslocacaoComponent,
    ImovelComponent,
    ImoveisComponent,
    CamelCasePipe
  ],
  providers: [
    ImoveisService,
    ImovelService,
    HomeService,
    CamelCasePipe
  ]
})
export class PagesModule {
}
