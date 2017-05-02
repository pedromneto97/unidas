import {Component, OnDestroy, OnInit} from '@angular/core';
import {Imovel} from '../../app.component';
import {HomeService} from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imoveis: Imovel;

  constructor(private servico: HomeService) {
    this.busca();
  }

  busca() {
    this.servico.get().subscribe(
      imovel => this.imoveis = imovel
    );
  }

  ngOnInit() {
  }


}
