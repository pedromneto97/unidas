import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Subscription} from 'rxjs/Subscription';

import {Imovel} from "../../../model/imovel";
import {ImovelService} from "../../../services/imovel.service";

@Component({
  selector: 'app-imoveis',
  templateUrl: './imoveis.component.html',
  styleUrls: ['./imoveis.component.css']
})
export class ImoveisComponent implements OnInit, OnDestroy {
  imoveis: Imovel[];
  error: Error;
  rotatipo: string;
  rotafinalidade: string;
  private tipo: number;
  private finalidade: number;
  private inscricao: Subscription;

  constructor(private servico: ImovelService, private route: ActivatedRoute) {
  }

  busca(a, b) {
    this.servico.getImoveis().then(
      imovel => this.imoveis = imovel
    );
  }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.rotafinalidade = params['finalidade'];
        this.rotatipo = params['tipo'];
        switch (params['tipo']) {
          case 'residencial':
            this.tipo = 1;
            break;
          case 'Residencial':
            this.tipo = 1;
            break;
          case 'comercial':
            this.tipo = 2;
            break;
          case 'Comercial' :
            this.tipo = 2;
            break;
          case 'kitnet':
            this.tipo = 3;
            break;
          case 'Kitnet':
            this.tipo = 3;
            break;
          case 'rural':
            this.tipo = 4;
            break;
          case 'Rural':
            this.tipo = 4;
            break;
          case 'terreno':
            this.tipo = 5;
            break;
          case 'Terreno':
            this.tipo = 5;
            break;
          default:
            this.tipo = 0;
        }
        switch (params['finalidade']) {
          case 'venda':
            this.finalidade = 1;
            break;
          case 'Venda':
            this.finalidade = 1;
            break;
          case 'aluguel':
            this.finalidade = 2;
            break;
          case 'Aluguel':
            this.finalidade = 2;
            break;
          default:
            this.finalidade = 0;
        }
        this.imoveis = null;
        this.busca(this.finalidade, this.tipo);
      }
    );
  }


  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
