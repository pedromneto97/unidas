import {Component, OnInit} from '@angular/core';

import {Imovel} from '../../../model/imovel';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imoveis: Imovel[];
  lista: Imovel[];
  inscricao: Subscription;


  constructor(private rota: ActivatedRoute) {

  }


  ngOnInit() {
    this.inscricao = this.rota.data.subscribe((data: { imovel: Imovel[] }) => {
      this.imoveis = data.imovel;
    });
    this.lista = [];
    if (this.imoveis != null && this.imoveis.length > 0) {
      this.imoveis.forEach(i => {
        if (i.foto.length > 0 && this.lista.length < 8) {
          this.lista.push(i);
        }
      });
    }
  }


}
