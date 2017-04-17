import {ImoveisService} from './imoveis.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-imoveis',
  templateUrl: './imoveis.component.html',
  styleUrls: ['./imoveis.component.css']
})
export class ImoveisComponent implements OnInit, OnDestroy {
  imoveis: string[];
  tipo: number;
  finalidade: number;
  inscricao: Subscription;

  constructor(private servico: ImoveisService, private route: ActivatedRoute) {
    this.imoveis = servico.getImoveis();
  }

  busca(a, b) {
    this.servico.busca(a, b);
  }

  ngOnInit() {
    this.inscricao = this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.tipo = queryParams['tipo'];
        this.finalidade = queryParams['finalidade'];
        return this.servico.busca(this.finalidade, this.tipo);
      }
    );
  }


  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
