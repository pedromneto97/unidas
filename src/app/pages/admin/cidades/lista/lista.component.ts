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
  private inscricao: Subscription;

  constructor(private rota: ActivatedRoute) {
  }

  ngOnInit() {
    this.inscricao = this.rota.data.subscribe((data: { cidade: Cidade[] }) => {
      this.cidades = data.cidade;
    });
  }

  apagar(id) {
    console.log(id);
  }

}
