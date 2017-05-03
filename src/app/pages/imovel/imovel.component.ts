import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Imovel} from '../../app.component';
import {ImovelService} from './imovel.service';


@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.css']
})
export class ImovelComponent implements OnInit, OnDestroy {

  imoveis: Imovel;
  id: number;
  inscricao: Subscription;

  constructor(private servico: ImovelService, private route: ActivatedRoute) {
  }

  busca(id) {
    this.servico.busca(id).subscribe(
      imovel => this.imoveis = imovel
    );
  }

  ngOnInit() {
    this.inscricao = this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.imoveis = null;
        this.id = queryParams['id'];
        this.busca(this.id);
      }
    );
  }


  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
