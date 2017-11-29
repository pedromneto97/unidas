import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ImovelService} from "../../../services/imovel.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {FormCanDeactivate} from "../../../guard/form-can-deactivate.guard";
import {Imovel} from "../../../model/imovel";
import {Finalidade} from "../../../model/finalidade";
import {Tipo} from "../../../model/tipo";
import {FinalidadeService} from "../../../services/finalidade.service";
import {TipoService} from "../../../services/tipo.service";

@Component({
  selector: 'app-editarimovel',
  templateUrl: './editarimovel.component.html',
  styleUrls: ['./editarimovel.component.css']
})
export class EditarimovelComponent implements OnInit, OnDestroy, FormCanDeactivate {
  ImovelForm: FormGroup;
  Imovel: Imovel;
  inscricao: Subscription;
  flag = true;
  Tipo: Tipo[];
  Finalidade: Finalidade[];

  constructor(private formBuilder: FormBuilder, private imovel: ImovelService, private rota: ActivatedRoute,
              private finalidade: FinalidadeService, private tipo: TipoService) {
    this.formBuilder = new FormBuilder();
  }

  ngOnInit() {
    this.ImovelForm = this.formBuilder.group({
      numero: [null, Validators.compose([Validators.min(0)])],
      valor: [null, Validators.compose([Validators.min(100)])],
      dormitorio: [null, Validators.compose([Validators.min(0)])],
      suite: [null, Validators.compose([Validators.min(0)])],
      banheiro: [null, Validators.compose([Validators.min(0)])],
      garagem: [null, Validators.compose([Validators.min(0)])],
      descricao: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      aterreno: [null, Validators.compose([Validators.min(0)])],
      aconstruida: [null, Validators.compose([Validators.min(0)])],
      id_tipo: [null, Validators.required],
      id_finalidade: [null, Validators.required],
      rua: this.formBuilder.group({
        cep: [null, Validators.compose([Validators.required, Validators.pattern(new RegExp('[0-9]{8}'))])],
        rua: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
        bairro: this.formBuilder.group({
          bairro: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
          cidade: this.formBuilder.group({
            cidade: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
            estado: this.formBuilder.group({
              estado: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
              uf: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])]
            }),
          }),
        }),
      }),
    });
    this.inscricao = this.rota.data.subscribe((data: { imovel: Imovel }) => {
      this.Imovel = data.imovel[0];
      this.patchform(this.Imovel);
    });
    this.finalidade.getFinalidades()
      .then((fim: Finalidade[]) => {
        this.Finalidade = fim;
      });
    this.tipo.getTipos()
      .then((tipo: Tipo[]) => {
        this.Tipo = tipo;
      });
  }

  CanDeactivate() {
    if (this.ImovelForm.touched && this.flag) {
      return window.confirm('Descartar Alterações?');
    }
    return true;
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  patchform(imovel) {
    this.ImovelForm.patchValue({
      numero: imovel.numero,
      valor: imovel.valor,
      dormitorio: imovel.dormitorio,
      suite: imovel.suite,
      banheiro: imovel.banheiro,
      garagem: imovel.garagem,
      descricao: imovel.descricao,
      aterreno: imovel.aterreno,
      aconstruida: imovel.aconstruida,
      rua: {
        cep: imovel.rua.cep,
        rua: imovel.rua.rua,
        bairro: {
          bairro: imovel.rua.bairro.bairro,
          cidade: {
            cidade: imovel.rua.bairro.cidade.cidade,
            estado: {
              estado: imovel.rua.bairro.cidade.estado.estado,
              uf: imovel.rua.bairro.cidade.estado.uf
            }
          }
        }
      }
    });
  }

  onSubmit() {
    console.log(this.ImovelForm.value);
    this.flag = false;
  }


}
