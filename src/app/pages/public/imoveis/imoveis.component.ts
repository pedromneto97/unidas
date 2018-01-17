import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Subscription} from 'rxjs/Subscription';

import {Imovel} from '../../../model/imovel';
import {Tipo} from '../../../model/tipo';
import {Finalidade} from '../../../model/finalidade';

@Component({
  selector: 'app-imoveis',
  templateUrl: './imoveis.component.html',
  styleUrls: ['./imoveis.component.css']
})
export class ImoveisComponent implements OnInit, OnDestroy {
  imoveis: Imovel[];
  lista: Imovel[];
  tipo: Tipo;
  finalidade: Finalidade;
  error: Error;
  private inscricao: Subscription;
  public p = 1;

  constructor(private rota: ActivatedRoute) {
  }

  ngOnInit() {
    this.inscricao = this.rota.data.subscribe((data: { imovel: Imovel[], tipo: Tipo, finalidade: Finalidade }) => {
      this.imoveis = data.imovel;
      this.lista = data.imovel;
      if (data.tipo != null) {
        this.tipo = data.tipo;
      }
      if (data.finalidade != null) {
        this.finalidade = data.finalidade;
      }
    });

  }


  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
