import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-novoimovel',
  templateUrl: './novoimovel.component.html',
  styleUrls: ['./novoimovel.component.css']
})
export class NovoimovelComponent implements OnInit {
  novoImovelForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.novoImovelForm = this.formBuilder.group({
      numero: [null, Validators.compose([Validators.min(0), Validators.pattern(new RegExp('[0-9]'))])],
      valor: [null, Validators.compose([Validators.min(100), Validators.pattern(new RegExp('[0-9]'))])],
      dormitorio: [null, Validators.compose([Validators.pattern(new RegExp('[0-9]'))])],
      suite: [null, Validators.compose([Validators.pattern(new RegExp('[0-9]'))])],
      banheiros: [null, Validators.compose([Validators.pattern(new RegExp('[0-9]'))])],
      garagem: [null, Validators.compose([Validators.pattern(new RegExp('[0-9]'))])],
      descricao: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      aterreno: [null, Validators.compose([Validators.min(0), Validators.pattern(new RegExp('[0-9]'))])],
      aconstruida: [null, Validators.compose([Validators.min(0), Validators.pattern(new RegExp('[0-9]'))])],
      rua: this.formBuilder.group({
        cep: [null, Validators.compose([Validators.pattern(new RegExp('[0-9]{8}'))])],
        rua: [null, Validators.compose([Validators.minLength(3)])],
        bairro: this.formBuilder.group({
          bairro: [null, Validators.compose([Validators.minLength(3)])],
          cidade: this.formBuilder.group({
            cidade: [null, Validators.minLength(3)],
            estado: this.formBuilder.group({
              estado: [null, Validators.compose([Validators.minLength(3)])],
              uf: [null, Validators.compose([Validators.min(2), Validators.max(2)])]
            })
          })
        }),
      }),
    })
    ;

  }

  buscaCep(cep) {
    console.log(cep);
  }

  onSubmit() {
    console.log(this.novoImovelForm.value);
  }

}
