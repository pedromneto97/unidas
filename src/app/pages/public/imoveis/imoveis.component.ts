import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Subscription} from 'rxjs/Subscription';

import {Imovel} from "../../../model/imovel";

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
  private route: Subscription;
  private lista: Subscription;

  constructor(private rota: ActivatedRoute) {
  }

  ngOnInit() {
    this.lista = this.rota.data.subscribe((data: { imovel: Imovel[] }) => {
      this.imoveis = data.imovel;
    });
    this.route = this.rota.params.subscribe((valores) => {
      this.rotatipo = valores['tipo'];
      this.rotafinalidade = valores['finalidade'];
    });

  }


  ngOnDestroy() {
    this.lista.unsubscribe();
    this.route.unsubscribe();
  }

}
