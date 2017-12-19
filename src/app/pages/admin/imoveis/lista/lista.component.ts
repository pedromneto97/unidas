import {Component, OnInit} from '@angular/core';
import {Imovel} from "../../../../model/imovel";
import {Subscription} from "rxjs/Subscription";
import {ImovelService} from "../../../../services/imovel.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-imoveis',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaImovelComponent implements OnInit {

  imoveis: Imovel[];
  error: Error;
  rotatipo: string;
  rotafinalidade: string;
  private tipo: number;
  private finalidade: number;
  private inscricao: Subscription;

  constructor(private servico: ImovelService, private rota: ActivatedRoute) {
  }

  pdf(id) {
    console.log(id);
  }

  apagarImovel(id) {
    console.log(id);
  }

  ngOnInit() {
    this.inscricao = this.rota.data.subscribe((data: { imovel: Imovel[] }) => {
      this.imoveis = data.imovel;
    });
  }

}
