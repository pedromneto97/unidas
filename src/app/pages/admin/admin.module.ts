import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {InicialComponent} from './inicial/inicial.component';
import {AdminComponent} from "./admin.component";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    InicialComponent
  ]
})
export class AdminModule {
}
