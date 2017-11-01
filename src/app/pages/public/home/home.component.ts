import {Component, OnInit} from '@angular/core';

import {Imovel} from "../../../model/imovel";
import {Rua} from "../../../model/rua";
import {Bairro} from "../../../model/bairro";
import {Cidade} from "../../../model/cidade";
import {Estado} from "../../../model/estado";

import {ImovelService} from "../../../services/imovel.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imoveis: Imovel[];


  constructor(private servico: ImovelService) {
    this.busca();
  }

  busca() {
    this.servico.getImoveis()
      .then(imovel => this.imoveis = imovel);
  }

  ngOnInit() {
  }


}
