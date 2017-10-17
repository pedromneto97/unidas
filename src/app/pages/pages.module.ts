import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {PagesRoutingModule} from './pages.routing.module';

import {HomeComponent} from './home/home.component';
import {EmpresaComponent} from './empresa/empresa.component';
import {PagesComponent} from './pages.component';
import {RegraslocacaoComponent} from './regraslocacao/regraslocacao.component';
import {ImovelComponent} from './imovel/imovel.component';
import {ImoveisComponent} from './imoveis/imoveis.component';

import {CamelCasePipe} from '../pipes/camel-case.pipe';

import {ImovelService} from '../services/imovel.service';

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
    ImovelService,
    CamelCasePipe
  ]
})
export class PagesModule {
}
