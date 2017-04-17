"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var pages_component_1 = require('./pages.component');
var home_component_1 = require('./home/home.component');
var empresa_component_1 = require('./empresa/empresa.component');
var regraslocacao_component_1 = require('./regraslocacao/regraslocacao.component');
var pagesRoutes = [{
        path: '', component: pages_component_1.PagesComponent, children: [
            { path: 'home', component: home_component_1.HomeComponent },
            { path: 'empresa', component: empresa_component_1.EmpresaComponent },
            { path: 'regraslocacao', component: regraslocacao_component_1.RegraslocacaoComponent },
            { path: 'imovel', component: InfoimovelComponent }
        ]
    }];
var PagesRoutingModule = (function () {
    function PagesRoutingModule() {
    }
    PagesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(pagesRoutes)],
            exports: [router_1.RouterModule]
        })
    ], PagesRoutingModule);
    return PagesRoutingModule;
}());
exports.PagesRoutingModule = PagesRoutingModule;
