import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Tipo} from '../../../../model/tipo';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaTipoComponent implements OnInit, OnDestroy {

  public tipos: Tipo[];
  public lista: Tipo[];
  public p = 1;
  private inscricao: Subscription;

  constructor(private rota: ActivatedRoute) {
  }

  ngOnInit() {
    this.inscricao = this.rota.data.subscribe((data: { tipo: Tipo[] }) => {
      this.tipos = data.tipo;
      this.lista = this.tipos;
    });
  }

  busca(busca) {
    if (busca == null || busca === '') {
      this.lista = this.tipos;
      return;
    }
    this.lista = [];
    const aux = new RegExp(busca, 'i');
    this.tipos.forEach(e => {
      if (!e.tipo.search(aux)) {
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
