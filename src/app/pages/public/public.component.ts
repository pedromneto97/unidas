import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Tipo} from "../../model/tipo";
import {Finalidade} from "../../model/finalidade";

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit, OnDestroy {
  public tipo: Tipo[];
  public finalidade: Finalidade[];
  private inscricao: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.inscricao = this.route.data.subscribe((data: { tipo: Tipo[], finalidade: Finalidade[] }) => {
      this.tipo = data.tipo;
      this.finalidade = data.finalidade;
    });
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
