import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormCanDeactivateGuard} from "../../../guard/form-can-deactivate.guard";
import {RuaService} from "../../../services/rua.service";
import {Imovel} from "../../../model/imovel";
import {CidadeService} from "../../../services/cidade.service";

@Component({
  selector: 'app-novoimovel',
  templateUrl: './novoimovel.component.html',
  styleUrls: ['./novoimovel.component.css']
})
export class NovoimovelComponent implements OnInit, FormCanDeactivateGuard {
  ImovelForm: FormGroup;
  Imovel: Imovel;
  flag: boolean = true;

  constructor(private formBuilder: FormBuilder, private servicoCep: RuaService, private  cidade: CidadeService) {
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
    let cepDB, cepbusca;
    this.servicoCep.cep(cep)
      .then((resultado) => {
        console.log(resultado);
        cepDB = resultado;
        if (cepDB != null) {
          this.patchformDB(cepDB);
          this.ImovelForm.get('rua.rua').disable();
          this.ImovelForm.get('rua.bairro.bairro').disable();
          this.ImovelForm.get('rua.bairro.cidade.cidade').disable();
          this.ImovelForm.get('rua.bairro.cidade.estado.estado').disable();
          this.ImovelForm.get('rua.bairro.cidade.estado.uf').disable();
        } else {
          this.servicoCep.getCEP(cep)
            .then((result) => {
                console.log(result);
                cepbusca = result;
                if (cepbusca.cep != null) {
                  this.ImovelForm.get('rua.rua').enable();
                  this.ImovelForm.get('rua.bairro.bairro').enable();
                  let busca = {
                    cidade: cepbusca.localidade,
                    uf: cepbusca.uf
                  }
                  let cid;
                  this.cidade.busca(busca)
                    .then((res) => {
                      cid = res;
                      if (cid != null) {
                        console.log(cid);
                        this.patchformCompleto(cepbusca, cid);
                      } else {
                        console.log("Cidade não encontrada");
                        /*
                        * Necessário fazer tratamento aqui
                        * */
                        this.ImovelForm.get('rua.bairro.cidade.cidade').enable();
                        this.ImovelForm.get('rua.bairro.cidade.estado.estado').enable();
                        this.ImovelForm.get('rua.bairro.cidade.estado.uf').enable();
                        this.patchformBusca(cepbusca);
                      }
                    });
                } else {
                  console.log("Nenhum cep encontrado");
                  /*
                   * Necessário fazer tratamento aqui
                   */
                }
              }
            );
        }
      });
  }

  patchformDB(imovel) {
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

  patchformBusca(imovel) {
    let cep: number;
    cep = parseInt(imovel.cep.substr(0, 5) + imovel.cep.substr(6, 8));
    this.ImovelForm.patchValue({
      rua: {
        cep: cep,
        rua: imovel.logradouro,
        bairro: {
          bairro: imovel.bairro,
          cidade: {
            cidade: imovel.localidade,
            estado: {
              estado: imovel.estado,
              uf: imovel.uf
            }
          }
        }
      }
    });
  }

  patchformCompleto(imovel, cid) {
    let cep: number;
    cep = parseInt(imovel.cep.substr(0, 5) + imovel.cep.substr(6, 8));
    this.ImovelForm.patchValue({
      rua: {
        cep: cep,
        rua: imovel.logradouro,
        bairro: {
          bairro: imovel.bairro,
          cidade: {
            cidade: imovel.localidade,
            estado: {
              estado: cid[0].estado.estado,
              uf: imovel.uf
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
