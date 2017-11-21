import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ImovelService} from "../../../services/imovel.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-editarimovel',
  templateUrl: './editarimovel.component.html',
  styleUrls: ['./editarimovel.component.css']
})
export class EditarimovelComponent implements OnInit, OnDestroy {
  ImovelForm: FormGroup;
  inscricao: Subscription;

  constructor(private formBuilder: FormBuilder, private imovel: ImovelService, private rota: ActivatedRoute) {
    this.formBuilder = new FormBuilder();
  }

  ngOnInit() {
    this.inscricao = this.rota.params.subscribe(
      (Params: any) => {
        this.buscaimovel(Params['id']);
      }
    );

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
    })
    ;

  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  buscaimovel(id) {
    this.imovel.getImovel(id)
      .then((imovel) => {
        this.patchform(imovel);
      });
  }

  patchform(imovel) {
    this.ImovelForm.patchValue({
      numero: imovel[0].numero,
      valor: imovel[0].valor,
      dormitorio: imovel[0].dormitorio,
      suite: imovel[0].suite,
      banheiro: imovel[0].banheiro,
      garagem: imovel[0].garagem,
      descricao: imovel[0].descricao,
      aterreno: imovel[0].aterreno,
      aconstruida: imovel[0].aconstruida,
      rua: {
        cep: imovel[0].rua.cep,
        rua: imovel[0].rua.rua,
        bairro: {
          bairro: imovel[0].rua.bairro.bairro,
          cidade: {
            cidade: imovel[0].rua.bairro.cidade.cidade,
            estado: {
              estado: imovel[0].rua.bairro.cidade.estado.estado,
              uf: imovel[0].rua.bairro.cidade.estado.uf
            }
          }
        }
      }
    });
  }

  onSubmit() {
    console.log(this.ImovelForm.value);
  }


}
