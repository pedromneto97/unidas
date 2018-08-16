import {Component, OnInit} from '@angular/core';
import {Bairro} from '../../../../model/bairro';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaBairroComponent implements OnInit {

  public bairros: Bairro[];
  public lista: Bairro[];
  public inscricao: Subscription;
  p = 1;

  constructor(private rota: ActivatedRoute) {
  }

  ngOnInit() {
    this.inscricao = this.rota.data.subscribe((data: { bairro: Bairro[] }) => {
      this.bairros = data.bairro;
      this.lista = data.bairro;
    });
  }

  apagar(id) {
    console.log(id);
  }

  busca(busca) {
    if (busca == null || busca === '') {
      this.lista = this.bairros;
      return;
    }
    this.lista = [];
    let aux: RegExp;
    aux = new RegExp(busca, 'gi');
    this.bairros.forEach(e => {
      let add = false;
      if (!e.bairro.search(aux)) {
        this.lista.push(e);
        add = true;
      }
      if (!add && !e.cidade.cidade.search(aux)) {
        this.lista.push(e);
        add = true;
      }
      if (!add && !e.cidade.estado.estado.search(aux)) {
        this.lista.push(e);
        add = true;
      }
      if (!add && !e.cidade.estado.uf.search(aux)) {
        this.lista.push(e);
      }
    });
  }
}
