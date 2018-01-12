import {Component, OnInit} from '@angular/core';
import {Imovel} from '../../../../model/imovel';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {isNumber} from 'util';

@Component({
  selector: 'app-imoveis',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaImovelComponent implements OnInit {

  public imoveis: Imovel[];
  public lista: Imovel[];
  private inscricao: Subscription;
  public p = 1;

  constructor(private rota: ActivatedRoute) {
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
      this.lista = data.imovel;
    });
  }

  busca(busca) {
    if (busca == null || busca === '') {
      this.lista = this.imoveis;
      return;
    }
    this.lista = [];
    let aux: RegExp;
    if (!isNumber(busca)) {
      aux = new RegExp(busca, 'gi');
    } else {
      aux = new RegExp(busca);
    }
    this.imoveis.forEach(e => {
      let add = false;
      if (!e.rua.rua.search(aux)) {
        this.lista.push(e);
        add = true;
      }
      if (!add && aux.exec(e.rua.cep.toString())) {
        this.lista.push(e);
        add = true;
      }
      if (!add && !e.rua.bairro.bairro.search(aux)) {
        this.lista.push(e);
        add = true;
      }
      if (!add && !e.rua.bairro.cidade.cidade.search(aux)) {
        this.lista.push(e);
        add = true;
      }
      if (!add && !e.rua.bairro.cidade.estado.estado.search(aux)) {
        this.lista.push(e);
        add = true;
      }
      if (!add && !e.rua.bairro.cidade.estado.uf.search(aux)) {
        this.lista.push(e);
      }
    });
  }
}
