import {Component, OnDestroy, OnInit} from '@angular/core';
import {Imovel} from '../../../../model/imovel';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {isNumber} from 'util';
import {ImovelService} from '../../../../services/imovel.service';

@Component({
  selector: 'app-imoveis',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaImovelComponent implements OnInit, OnDestroy {

  public imoveis: Imovel[];
  public lista: Imovel[];
  private inscricao: Subscription;
  private delete: Subscription;
  private dflag = false;
  public p = 1;
  public flag = {
    tipo: null,
    f: false,
    mensagem: null
  };

  constructor(private rota: ActivatedRoute, private im: ImovelService) {
  }

  pdf(id) {
    console.log(id);
  }

  apagar(id, i) {
    const aux = 'Deseja mesmo apagar o imóvel: '.concat(id);
    if (window.confirm(aux)) {
      this.delete = this.im.delete(id).subscribe(value => {
        },
        err => {
          if (err.status === 200) {
            this.flag.f = true;
            this.flag.mensagem = err.error.text.concat('    ID: '.concat(id));
            this.flag.tipo = 'sucesso';
            this.imoveis.splice(i, 1);
            this.lista.splice(i, 1);
          } else {
            this.flag.f = true;
            this.flag.mensagem = err.error.text;
            this.flag.tipo = 'erro';
          }
        });
      this.dflag = true;
    }
  }

  ngOnInit() {
    this.inscricao = this.rota.data.subscribe((data: { imovel: Imovel[] }) => {
      this.imoveis = data.imovel;
      this.lista = data.imovel;
    });
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
    if (this.dflag) {
      this.delete.unsubscribe();
    }
  }

  busca(busca) {
    if (busca == null || busca === '') {
      this.lista = this.imoveis;
      return;
    }
    this.lista = [];
    let aux: RegExp;
    if (!isNumber(busca)) {
      aux = new RegExp(busca, 'gi');
    } else {
      aux = new RegExp(busca);
    }
    this.imoveis.forEach(e => {
      let add = false;
      if (!e.rua.rua.search(aux)) {
        this.lista.push(e);
        add = true;
      }
      if (!add && aux.exec(e.rua.cep.toString())) {
        this.lista.push(e);
        add = true;
      }
      if (!add && !e.rua.bairro.bairro.search(aux)) {
        this.lista.push(e);
        add = true;
      }
      if (!add && !e.rua.bairro.cidade.cidade.search(aux)) {
        this.lista.push(e);
        add = true;
      }
      if (!add && !e.rua.bairro.cidade.estado.estado.search(aux)) {
        this.lista.push(e);
        add = true;
      }
      if (!add && !e.rua.bairro.cidade.estado.uf.search(aux)) {
        this.lista.push(e);
      }
    });
  }
}
