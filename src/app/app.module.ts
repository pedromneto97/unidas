import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {AuthGuard} from "./guard/auth.guard";
import {RotaGuard} from "./guard/rota.guard";
import {ImovelResolver} from "./guard/imovel.resolver";
import {ImovelService} from "./services/imovel.service";
import {HttpClientModule} from "@angular/common/http";
import {InteresseService} from "./services/interesse.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, RotaGuard, ImovelResolver, ImovelService, InteresseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
