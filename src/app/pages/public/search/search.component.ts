import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Imovel} from '../../../model/imovel';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  private info: Subscription;
  private params: Subscription;
  public imoveis: Imovel[];
  public lista: Imovel[];
  public p = 1;

  constructor(private rota: ActivatedRoute) {
  }

  ngOnInit() {
    this.info = this.rota.data.subscribe((data: { imovel: Imovel[] }) => {
      this.imoveis = data.imovel;
      this.lista = data.imovel;
    });
    this.params = this.rota.queryParams.subscribe(params => {
      console.log(params);
    });
  }

  ngOnDestroy() {
    this.info.unsubscribe();
    this.params.unsubscribe();
  }
}
