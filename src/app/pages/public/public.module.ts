import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {PublicRoutingModule} from './public.routing.module';

import {PublicComponent} from './public.component';
import {HomeComponent} from './home/home.component';
import {EmpresaComponent} from './empresa/empresa.component';
import {RegraslocacaoComponent} from './regraslocacao/regraslocacao.component';
import {ImovelComponent} from './imovel/imovel.component';
import {ImoveisComponent} from './imoveis/imoveis.component';
import {CamelCasePipe} from '../../pipes/camel-case.pipe';
import {ImovelService} from '../../services/imovel.service';
import {NgxPaginationModule, PaginatePipe} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    NgxPaginationModule
  ],
  declarations: [
    PublicComponent,
    HomeComponent,
    EmpresaComponent,
    RegraslocacaoComponent,
    ImovelComponent,
    ImoveisComponent,
    CamelCasePipe
  ],
  providers: [
    ImovelService,
    PaginatePipe
  ]
})
export class PublicModule {
}
