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

  constructor(private servico: ImovelService, private rota: ActivatedRoute) {
  }

  ngOnInit() {
    this.inscricao = this.rota.data.subscribe((data: { imovel: Imovel[] }) => {
      this.imoveis = data.imovel;
    });
  }


  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
