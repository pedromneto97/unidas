import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
import {AlertModule, BsDropdownModule, CarouselModule, CollapseModule, ModalModule, TooltipModule} from 'ngx-bootstrap';
import {SearchComponent} from './search/search.component';
import {CidadeResolver} from '../../guard/cidade.resolver';
import {BairroService} from '../../services/bairro.service';
import {CidadeService} from '../../services/cidade.service';
import {EstadoService} from '../../services/estado.service';
import {AuthService} from '../../services/auth.service';
import {RuaService} from '../../services/rua.service';
import {InteresseResolver} from '../../guard/interesse.resolver';
import {EstadoResolver} from '../../guard/estado.resolver';
import {BairroResolver} from '../../guard/bairro.resolver';
import {RuaResolver} from '../../guard/rua.resolver';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    BsDropdownModule,
    ModalModule,
    TooltipModule,
    CollapseModule,
    AlertModule,
    CarouselModule
  ],
  declarations: [
    PublicComponent,
    HomeComponent,
    EmpresaComponent,
    RegraslocacaoComponent,
    ImovelComponent,
    ImoveisComponent,
    SearchComponent,
    CamelCasePipe
  ],
  providers: [
    ImovelService,
    RuaService,
    AuthService,
    CidadeService,
    EstadoService,
    BairroService,
    RuaResolver,
    BairroResolver,
    CidadeResolver,
    EstadoResolver,
    InteresseResolver,
    PaginatePipe
  ]
})
export class PublicModule {
}
