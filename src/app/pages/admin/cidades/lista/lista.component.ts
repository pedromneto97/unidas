import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Cidade} from '../../../../model/cidade';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaCidadeComponent implements OnInit {

  public cidades: Cidade[];
  public lista: Cidade[];
  private inscricao: Subscription;
  public p = 1;

  constructor(private rota: ActivatedRoute) {
  }

  ngOnInit() {
    this.inscricao = this.rota.data.subscribe((data: { cidade: Cidade[] }) => {
      this.cidades = data.cidade;
      this.lista = data.cidade;
    });
  }

  apagar(id) {
    console.log(id);
  }

  busca(busca) {
    if (busca == null || busca === '') {
      this.lista = this.cidades;
      return;
    }
    this.lista = [];
    const aux = new RegExp(busca, 'i');
    this.cidades.forEach(e => {
      let add = false;
      if (!e.cidade.search(aux)) {
        this.lista.push(e);
        add = true;
      }
      if (!add && !e.estado.estado.search(aux)) {
        this.lista.push(e);
        add = true;
      }
      if (!add && !e.estado.uf.search(aux)) {
        this.lista.push(e);
      }
    });
  }
}
