import {ImoveisService} from './imoveis.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Subscription} from 'rxjs/Subscription';
import {Imovel} from '../../app.component';

@Component({
  selector: 'app-imoveis',
  templateUrl: './imoveis.component.html',
  styleUrls: ['./imoveis.component.css']
})
export class ImoveisComponent implements OnInit, OnDestroy {
  imoveis: Imovel[];
  error: Error;
  tipo: number;
  finalidade: number;
  inscricao: Subscription;

  constructor(private servico: ImoveisService, private route: ActivatedRoute) {
  }

  busca(a, b) {
    this.servico.busca(a, b).subscribe(
      imovel => this.imoveis = imovel
    );
  }

  ngOnInit() {
    this.inscricao = this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.imoveis = null;
        this.tipo = queryParams['tipo'];
        this.finalidade = queryParams['finalidade'];
        this.busca(this.finalidade, this.tipo);
      }
    );
  }


  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
