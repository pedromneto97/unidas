import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Finalidade} from '../../../../model/finalidade';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaFinalidadeComponent implements OnInit, OnDestroy {

  public finalidades: Finalidade[];
  public lista: Finalidade[];
  public p = 1;
  private inscricao: Subscription;

  constructor(private rota: ActivatedRoute) {
  }

  ngOnInit() {
    this.inscricao = this.rota.data.subscribe((data: { finalidade: Finalidade[] }) => {
      this.finalidades = data.finalidade;
      this.lista = data.finalidade;
      console.log(this.lista);
    });
  }

  busca(busca) {
    if (busca == null || busca === '') {
      this.lista = this.finalidades;
      return;
    }
    this.lista = [];
    const aux = new RegExp(busca, 'i');
    this.finalidades.forEach(e => {
      if (!e.finalidade.search(aux)) {
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
