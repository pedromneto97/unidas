import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Estado} from '../../../../model/estado';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaEstadoComponent implements OnInit, OnDestroy {

  public estados: Estado[];
  public lista: Estado[];
  private inscricao: Subscription;
  public p = 1;

  constructor(private rota: ActivatedRoute) {
  }

  ngOnInit() {
    this.inscricao = this.rota.data.subscribe((data: { estado: Estado[] }) => {
      this.estados = data.estado;
      this.lista = this.estados;
    });
  }

  busca(busca) {
    if (busca == null || busca === '') {
      this.lista = this.estados;
      return;
    }
    this.lista = [];
    const aux = new RegExp(busca, 'i');
    this.estados.forEach(e => {
      let add = false;
      if (!e.estado.search(aux)) {
        this.lista.push(e);
        add = true;
      }
      if (!add && !e.uf.search(aux)) {
        this.lista.push(e);
      }
    });
  }

  apagar(id) {
    console.log(id);
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
