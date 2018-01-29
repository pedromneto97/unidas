import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {AuthGuard} from './guard/auth.guard';
import {RotaGuard} from './guard/rota.guard';
import {ImovelResolver} from './guard/imovel.resolver';
import {ImovelService} from './services/imovel.service';
import {HttpClientModule} from '@angular/common/http';
import {InteresseService} from './services/interesse.service';
import {TipoService} from './services/tipo.service';
import {FinalidadeService} from './services/finalidade.service';
import {TipoResolver} from './guard/tipo.resolver';
import {FinalidadeResolver} from './guard/finalidade.resolver';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {AlertModule, BsDropdownModule, CarouselModule, CollapseModule, ModalModule, TooltipModule} from 'ngx-bootstrap';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    CarouselModule.forRoot()
  ],
  exports: [
    BsDropdownModule,
    TooltipModule,
    ModalModule,
    CollapseModule,
    AlertModule,
    CarouselModule
  ],
  providers: [
    AuthGuard,
    RotaGuard,
    ImovelResolver,
    ImovelService,
    InteresseService,
    TipoService,
    FinalidadeService,
    TipoResolver,
    FinalidadeResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
