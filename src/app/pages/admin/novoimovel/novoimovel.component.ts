import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-novoimovel',
  templateUrl: './novoimovel.component.html',
  styleUrls: ['./novoimovel.component.css']
})
export class NovoimovelComponent implements OnInit {
  ImovelForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.formBuilder = new FormBuilder();
  }

  ngOnInit() {
    this.ImovelForm = this.formBuilder.group({
      numero: [null, Validators.compose([Validators.min(0)])],
      valor: [null, Validators.compose([Validators.required, Validators.min(100)])],
      dormitorio: [null, Validators.compose([Validators.required, Validators.min(0)])],
      suite: [null, Validators.compose([Validators.required, Validators.min(0)])],
      banheiro: [null, Validators.compose([Validators.required, Validators.min(0)])],
      garagem: [null, Validators.compose([Validators.required, Validators.min(0)])],
      descricao: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      aterreno: [null, Validators.compose([Validators.required, Validators.min(0)])],
      aconstruida: [null, Validators.compose([Validators.required, Validators.min(0)])],
      // rua: this.formBuilder.group({
      //   cep: [null, Validators.compose([Validators.required, Validators.pattern(new RegExp('[0-9]{8}'))])],
      //   rua: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      //   bairro: this.formBuilder.group({
      //     bairro: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      //     cidade: this.formBuilder.group({
      //       cidade: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      //       estado: this.formBuilder.group({
      //         estado: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      //         uf: [null, Validators.compose([Validators.required, Validators.min(2), Validators.max(2)])]
      //       })
      //     })
      //   }),
      // }),
    })
    ;

  }

  buscaCep(cep) {
    console.log(cep);
  }

  onSubmit() {
    console.log(this.ImovelForm.value);
  }

}
