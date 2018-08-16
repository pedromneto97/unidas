import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Imovel} from '../../../model/imovel';
import {Tipo} from '../../../model/tipo';
import {Finalidade} from '../../../model/finalidade';
import {Rua} from '../../../model/rua';
import {Bairro} from '../../../model/bairro';
import {Cidade} from '../../../model/cidade';
import {Estado} from '../../../model/estado';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  private info: Subscription;
  private params: Subscription;

  public filtroForm: FormGroup;

  public imoveis: Imovel[];
  public lista: Imovel[];

  public tipos: Tipo[];
  public tiposc: any[] = [];

  public finalidades: Finalidade[];
  public finalidadesc: any[] = [];

  public ruas: Rua[];
  public ruasc: any[] = [];

  public bairros: Bairro[];
  public bairrosc: any[] = [];

  public cidades: Cidade[];
  public cidadesc: any[] = [];

  public estados: Estado[];
  public estadosc: any[] = [];

  public p = 1;

  constructor(private rota: ActivatedRoute, private formBuilder: FormBuilder) {
    this.formBuilder = new FormBuilder();
  }

  ngOnInit() {
    this.info = this.rota.data.subscribe((data: {
      imovel: Imovel[], tipo: Tipo[], finalidade: Finalidade[],
      rua: Rua[], bairro: Bairro[], cidade: Cidade[], estado: Estado[]
    }) => {
      this.imoveis = data.imovel;
      this.lista = data.imovel;
      this.tipos = data.tipo;
      this.finalidades = data.finalidade;
      this.ruas = data.rua;
      this.bairros = data.bairro;
      this.cidades = data.cidade;
      this.estados = data.estado;
    });
    this.params = this.rota.queryParams.subscribe(params => {
      console.log(params);
    });
    this.filtroForm = this.formBuilder.group({
      tipo: [null]
    });
    this.filtro();
  }

  filtro() {
    let flag = false;
    this.lista.forEach(i => {
      // Varre tipos
      this.tiposc.forEach(t => {
        if (t.id === i.id_tipo) {
          flag = true;
          t.cont++;
        }
      });
      if (!flag) {
        this.tiposc.push({
          id: i.id_tipo,
          tipo: i.tipo.tipo,
          cont: 1
        });
      }
      flag = false;
      // Varre finalidades
      this.finalidadesc.forEach(f => {
        if (f.id === i.id_finalidade) {
          flag = true;
          f.cont++;
        }
      });
      if (!flag) {
        this.finalidadesc.push({
          id: i.id_finalidade,
          finalidade: i.finalidade.finalidade,
          cont: 1
        });
      }
      flag = false;
      // Varre ruas
      this.ruasc.forEach(r => {
        if (r.id === i.id_rua) {
          flag = true;
          r.cont++;
        }
      });
      if (!flag) {
        this.ruasc.push({
          id: i.id_rua,
          rua: i.rua.rua,
          cont: 1
        });
      }
      flag = false;
      // Varre Bairros
      this.bairrosc.forEach(b => {
        if (b.id === i.rua.id_bairro) {
          flag = true;
          b.cont++;
        }
      });
      if (!flag) {
        this.bairrosc.push({
          id: i.id_tipo,
          bairro: i.rua.bairro.bairro,
          cont: 1
        });
      }
      flag = false;
      this.cidadesc.forEach(c => {
        if (c.id === i.rua.bairro.id_cidade) {
          flag = true;
          c.cont++;
        }
      });
      if (!flag) {
        this.cidadesc.push({
          id: i.rua.bairro.id_cidade,
          cidade: i.rua.bairro.cidade.cidade,
          cont: 1
        });
      }
      flag = false;
      this.estadosc.forEach(e => {
        if (e.id === i.rua.bairro.cidade.id_estado) {
          flag = true;
          e.cont++;
        }
      });
      if (!flag) {
        this.estadosc.push({
          id: i.rua.bairro.cidade.id_estado,
          estado: i.rua.bairro.cidade.estado.estado,
          cont: 1
        });
      }
    });
  }

  ngOnDestroy() {
    this.info.unsubscribe();
    this.params.unsubscribe();
  }
}
