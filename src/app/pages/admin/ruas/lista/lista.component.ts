import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Rua} from "../../../../model/rua";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaRuaComponent implements OnInit {

  public ruas: Rua[];
  private inscricao: Subscription;

  constructor(private rota: ActivatedRoute) {
  }

  ngOnInit() {
    this.inscricao = this.rota.data.subscribe((data: { rua: Rua[] }) => {
      this.ruas = data.rua;
    });
  }

  apagarRua(id) {
    console.log(id);
  }

}
