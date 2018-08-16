import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Rua} from '../../../../model/rua';
import {ActivatedRoute} from '@angular/router';
import {isNumber} from 'util';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaRuaComponent implements OnInit {

  public ruas: Rua[];
  public lista: Rua[];
  private inscricao: Subscription;
  p = 1;

  constructor(private rota: ActivatedRoute) {
  }

  ngOnInit() {
    this.inscricao = this.rota.data.subscribe((data: { rua: Rua[] }) => {
      this.ruas = data.rua;
      this.lista = data.rua;
    });
  }

  apagar(id) {
    console.log(id);
  }

  busca(busca) {
    if (busca == null || busca === '') {
      this.lista = this.ruas;
      return;
    }
    this.lista = [];
    let aux: RegExp;
    if (!isNumber(busca)) {
      aux = new RegExp(busca, 'gi');
    } else {
      aux = new RegExp(busca);
    }
    this.ruas.forEach(e => {
      let add = false;
      if (!e.rua.search(aux)) {
        this.lista.push(e);
        add = true;
      }
      if (!add && aux.exec(e.cep.toString())) {
        this.lista.push(e);
        add = true;
      }
      if (!add && !e.bairro.bairro.search(aux)) {
        this.lista.push(e);
        add = true;
      }
      if (!add && !e.bairro.cidade.cidade.search(aux)) {
        this.lista.push(e);
        add = true;
      }
      if (!add && !e.bairro.cidade.estado.estado.search(aux)) {
        this.lista.push(e);
        add = true;
      }
      if (!add && !e.bairro.cidade.estado.uf.search(aux)) {
        this.lista.push(e);
      }
    });
  }

}
