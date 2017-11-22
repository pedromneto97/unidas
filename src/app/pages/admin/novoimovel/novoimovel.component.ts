import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormCanDeactivateGuard} from "../../../guard/form-can-deactivate.guard";
import {RuaService} from "../../../services/rua.service";
import {Imovel} from "../../../model/imovel";

@Component({
  selector: 'app-novoimovel',
  templateUrl: './novoimovel.component.html',
  styleUrls: ['./novoimovel.component.css']
})
export class NovoimovelComponent implements OnInit, FormCanDeactivateGuard {
  ImovelForm: FormGroup;
  Imovel: Imovel;

  constructor(private formBuilder: FormBuilder, private servicoCep: RuaService) {
    this.formBuilder = new FormBuilder();
  }

  canDeactivate() {
    if (this.ImovelForm.dirty) {
      return window.confirm('Descartar Alterações?');
    }
    return true;
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

  buscaCep(cep) {
    if (this.ImovelForm.get('rua.cep').invalid)
      return;
    let cepBD, cepbusca;
    let flag: boolean = false;
    this.servicoCep.cep(cep)
      .then((resultado) => {
        console.log(resultado);
        cepBD = resultado;
        if (cepBD[0].cep != null) {
          flag = true;
          this.patchform(cepBD);
        }
      });
    this.servicoCep.getCEP(cep)
      .then((result) => {
          console.log(result);
          cepbusca = result;
          if (cepbusca.cep != null && flag === false) {
            console.log('Aqui');
          }
        }
      );
  }

  patchform(imovel) {
    this.ImovelForm.patchValue({
      rua: {
        cep: imovel[0].cep,
        rua: imovel[0].rua,
        bairro: {
          bairro: imovel[0].bairro.bairro,
          cidade: {
            cidade: imovel[0].bairro.cidade.cidade,
            estado: {
              estado: imovel[0].bairro.cidade.estado.estado,
              uf: imovel[0].bairro.cidade.estado.uf
            }
          }
        }
      }
    });
  }

  onSubmit() {
    this.Imovel = this.ImovelForm.value;
    console.log(this.Imovel);
  }

}
