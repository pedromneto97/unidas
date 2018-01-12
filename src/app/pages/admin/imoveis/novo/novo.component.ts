import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormCanDeactivate} from '../../../../guard/form-can-deactivate.guard';

import {RuaService} from '../../../../services/rua.service';
import {CidadeService} from '../../../../services/cidade.service';
import {BairroService} from '../../../../services/bairro.service';
import {FinalidadeService} from '../../../../services/finalidade.service';
import {TipoService} from '../../../../services/tipo.service';
import {ImovelService} from '../../../../services/imovel.service';

import {Finalidade} from '../../../../model/finalidade';
import {Bairro} from '../../../../model/bairro';
import {Rua} from '../../../../model/rua';
import {Tipo} from '../../../../model/tipo';
import {Imovel} from '../../../../model/imovel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-novoimovel',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoImovelComponent implements OnInit, FormCanDeactivate {
  ImovelForm: FormGroup;
  Imovel: Imovel;
  Finalidade: Finalidade[];
  Tipo: Tipo[];
  flag = true;

  constructor(private formBuilder: FormBuilder, private servicoCep: RuaService, private  cidade: CidadeService,
              private bairro: BairroService, private finalidade: FinalidadeService, private tipo: TipoService,
              private rua: RuaService, private imov: ImovelService, private router: Router) {
    this.formBuilder = new FormBuilder();
  }

  CanDeactivate() {
    if (this.ImovelForm.dirty && this.flag) {
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
      id_finalidade: [null, Validators.required],
      id_tipo: [null, Validators.required],
      mobilia: [null],
      aservico: [null],
      rua: this.formBuilder.group({
        id: [null],
        cep: [null, Validators.compose([Validators.required, Validators.pattern(new RegExp('^[0-9]{8}$'))])],
        rua: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
        bairro: this.formBuilder.group({
          id: [null],
          bairro: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
          cidade: this.formBuilder.group({
            id: [null],
            cidade: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
            estado: this.formBuilder.group({
              id: [null],
              estado: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
              uf: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])]
            }),
          }),
        }),
      }),
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

  buscaCep(cep) {
    if (this.ImovelForm.get('rua.cep').invalid) {
      this.ImovelForm.get('rua').reset();
      this.ImovelForm.get('rua.rua').enable();
      this.ImovelForm.get('rua.bairro.bairro').enable();
      this.ImovelForm.get('rua.bairro.cidade.cidade').enable();
      this.ImovelForm.get('rua.bairro.cidade.estado.estado').enable();
      this.ImovelForm.get('rua.bairro.cidade.estado.uf').enable();
      return;
    }
    let cepDB, cepbusca;
    // Busca o CEP no banco
    this.servicoCep.cep(cep)
      .then((resultado) => {
        cepDB = resultado;
        if (cepDB != null) {
          this.patchformDB(cepDB);
          this.ImovelForm.get('rua.rua').disable();
          this.ImovelForm.get('rua.bairro.bairro').disable();
          this.ImovelForm.get('rua.bairro.cidade.cidade').disable();
          this.ImovelForm.get('rua.bairro.cidade.estado.estado').disable();
          this.ImovelForm.get('rua.bairro.cidade.estado.uf').disable();
        } else {
          /*
           * Busca o CEP fora
           */
          this.servicoCep.getCEP(cep)
            .then((result) => {
                cepbusca = result;
                if (cepbusca.cep != null) {
                  this.ImovelForm.get('rua.rua').enable();
                  /*
                    Busca Bairro
                   */
                  let bairro = {
                    bairro: cepbusca.bairro
                  };
                  this.bairro.busca(bairro).then((res) => {
                    bairro = res;
                    if (bairro != null) {
                      this.ImovelForm.get('rua.bairro.bairro').disable();
                      /*
                      *Busca cidade
                      */
                      const busca = {
                        cidade: cepbusca.localidade,
                        uf: cepbusca.uf
                      };
                      let cid;
                      this.cidade.busca(busca)
                        .then((res) => {
                          cid = res;
                          if (cid != null) {
                            this.ImovelForm.get('rua.bairro.cidade.cidade').disable();
                            this.ImovelForm.get('rua.bairro.cidade.estado.estado').disable();
                            this.ImovelForm.get('rua.bairro.cidade.estado.uf').disable();
                            this.bairroCidade(cepbusca, bairro, cid);
                          }
                        });
                    } else {
                      /*
                      Bairro não encontrado
                       */
                      this.ImovelForm.get('rua.bairro.bairro').enable();
                      const busca = {
                        cidade: cepbusca.localidade,
                        uf: cepbusca.uf
                      };
                      let cid;
                      this.cidade.busca(busca)
                        .then((res) => {
                          cid = res;
                          if (cid != null) {
                            this.cepCidade(cepbusca, cid);
                            this.ImovelForm.get('rua.bairro.cidade.cidade').disable();
                            this.ImovelForm.get('rua.bairro.cidade.estado.estado').disable();
                            this.ImovelForm.get('rua.bairro.cidade.estado.uf').disable();
                          } else {
                            this.ImovelForm.get('rua.bairro.cidade.cidade').enable();
                            this.ImovelForm.get('rua.bairro.cidade.estado.estado').enable();
                            this.ImovelForm.get('rua.bairro.cidade.estado.uf').enable();
                            this.apenasCep(cepbusca);
                          }
                        });
                    }
                  });

                } else {
                  this.ImovelForm.get('rua.rua').enable();
                  this.ImovelForm.get('rua.bairro.bairro').enable();
                  this.ImovelForm.get('rua.bairro.cidade.cidade').enable();
                  this.ImovelForm.get('rua.bairro.cidade.estado.estado').enable();
                  this.ImovelForm.get('rua.bairro.cidade.estado.uf').enable();
                  console.log('Nenhum cep encontrado');
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
        id: imovel[0].id,
        cep: imovel[0].cep,
        rua: imovel[0].rua,
        bairro: {
          id: imovel[0].bairro.id,
          bairro: imovel[0].bairro.bairro,
          cidade: {
            id: imovel[0].bairro.cidade.id,
            cidade: imovel[0].bairro.cidade.cidade,
            estado: {
              id: imovel[0].bairro.cidade.estado.id,
              estado: imovel[0].bairro.cidade.estado.estado,
              uf: imovel[0].bairro.cidade.estado.uf
            }
          }
        }
      }
    });
  }

  cepCidade(cep, cidade) {
    let c: number;
    c = parseInt(cep.cep.substr(0, 5) + cep.cep.substr(6, 8), 10);
    const resultado = {
      cep: c,
      rua: cep.logradouro,
      bairro: {
        bairro: cep.bairro,
        cidade: {
          id: cidade[0].id,
          cidade: cidade[0].cidade,
          estado: {
            id: cidade[0].estado.id,
            estado: cidade[0].estado.estado,
            uf: cidade[0].estado.uf
          }
        }
      }
    };
    this.patchformCompleto(resultado);
  }

  bairroCidade(cep, bairro, cidade) {
    let c: number;
    c = parseInt(cep.cep.substr(0, 5) + cep.cep.substr(6, 8), 10);
    const resultado = {
      cep: c,
      rua: cep.logradouro,
      bairro: {
        id: bairro[0].id,
        bairro: bairro[0].bairro,
        cidade: {
          id: cidade[0].id,
          cidade: cidade[0].cidade,
          estado: {
            id: cidade[0].estado.id,
            estado: cidade[0].estado.estado,
            uf: cidade[0].estado.uf
          }
        }
      }
    };
    this.patchformCompleto(resultado);
  }

  apenasCep(cep) {
    let c: number;
    c = parseInt(cep.cep.substr(0, 5) + cep.cep.substr(6, 8), 10);
    const resultado = {
      cep: c,
      rua: cep.logradouro,
      bairro: {
        bairro: cep.bairro,
        cidade: {
          cidade: cep.localidade,
          estado: {
            estado: null,
            uf: cep.uf
          }
        }
      }
    };
    this.patchformCompleto(resultado);
  }

  patchformCompleto(imovel) {
    console.log(imovel);
    this.ImovelForm.get('rua').reset();
    this.ImovelForm.patchValue({
      rua: {
        cep: imovel.cep,
        rua: imovel.rua,
        bairro: {
          id: imovel.bairro.id,
          bairro: imovel.bairro.bairro,
          cidade: {
            id: imovel.bairro.cidade.id,
            cidade: imovel.bairro.cidade.cidade,
            estado: {
              id: imovel.bairro.cidade.estado.id,
              estado: imovel.bairro.cidade.estado.estado,
              uf: imovel.bairro.cidade.estado.uf
            }
          }
        }
      }
    });
  }

  onSubmit() {
    let bairro: Bairro = new Bairro();
    let rua: Rua = new Rua();

    this.Imovel = this.ImovelForm.value;
    this.Imovel.id_rua = this.Imovel.rua.id;

    if (this.Imovel.id_rua == null) {
      rua = this.Imovel.rua;
      console.log('1' + rua);
      if (this.Imovel.rua.bairro.id == null) {
        bairro = this.Imovel.rua.bairro;
        bairro.id_cidade = bairro.cidade.id;
        console.log('2' + bairro);
        this.bairro.store(bairro)
          .then((res) => {
            rua.bairro = res;
            rua.id_bairro = rua.bairro.id;
            this.rua.store(rua)
              .then((resp) => {
                this.Imovel.rua = resp;
                this.Imovel.id_rua = this.Imovel.rua.id;
                this.imov.store(this.Imovel)
                  .then((resposta) => {
                    this.Imovel = resposta;
                    window.alert('Imóvel cadastrado');
                    this.flag = false;
                    this.router.navigate(['/admin/imoveis/lista']);
                  });
              });

          });
      } else {
        this.rua.store(rua)
          .then((res) => {
            this.Imovel.rua = res;
            this.Imovel.id_rua = this.Imovel.rua.id;
            this.imov.store(this.Imovel)
              .then((resp) => {
                this.Imovel = resp;
                window.alert('Imóvel cadastrado');
                this.flag = false;
                this.router.navigate(['/admin/imoveis/lista']);
              });
          });
      }

    } else {
      this.Imovel.id_rua = this.Imovel.rua.id;
      this.imov.store(this.Imovel)
        .then((res) => {
          this.Imovel = res;
          window.alert('Imóvel cadastrado');
          this.flag = false;
          this.router.navigate(['/admin/imoveis/lista']);
        });
    }
  }

  onReset() {
    if (window.confirm('Deseja limpar o formulário?')) {
      this.ImovelForm.reset();
    }
  }
}
