import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from "./login/login.component";
import {AuthComponent} from "./auth.component";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {
}
