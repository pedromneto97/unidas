import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormCanDeactivate} from "../../../../guard/form-can-deactivate.guard";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";

import {ImovelService} from "../../../../services/imovel.service";
import {FinalidadeService} from "../../../../services/finalidade.service";
import {TipoService} from "../../../../services/tipo.service";

import {Imovel} from "../../../../model/imovel";
import {Tipo} from "../../../../model/tipo";
import {Finalidade} from "../../../../model/finalidade";

@Component({
  selector: 'app-editarimovel',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarImovelComponent implements OnInit, OnDestroy, FormCanDeactivate {
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
    this.finalidade.getFinalidades()
      .then((fim: Finalidade[]) => {
        this.Finalidade = fim;
      });
    this.tipo.getTipos()
      .then((tipo: Tipo[]) => {
        this.Tipo = tipo;
      });

    this.inscricao = this.rota.data.subscribe((data: { imovel: Imovel }) => {
      this.Imovel = data.imovel;
    });
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
      id_tipo: [this.Imovel.id_tipo, Validators.required],
      id_finalidade: [this.Imovel.id_finalidade, Validators.required],
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
    this.patchform(this.Imovel);

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
