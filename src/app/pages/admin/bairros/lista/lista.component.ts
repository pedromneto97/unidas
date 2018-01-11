import {Component, OnInit} from '@angular/core';
import {Bairro} from '../../../../model/bairro';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaBairroComponent implements OnInit {

  public bairros: Bairro[];
  public inscricao: Subscription;

  constructor(private rota: ActivatedRoute) {
  }

  ngOnInit() {
    this.inscricao = this.rota.data.subscribe((data: { bairro: Bairro[] }) => {
      this.bairros = data.bairro;
    });
  }

  apagar(id) {
    console.log(id);
  }

}
