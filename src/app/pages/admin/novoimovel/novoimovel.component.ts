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
      numero: [null, Validators.compose([Validators.required, Validators.min(0)])],
      valor: [null, Validators.compose([Validators.min(100)])],
      dormitorio: [null, Validators.required],
      suite: [null, Validators.required],
      banheiros: [null, Validators.required],
      garagem: [null, Validators.required],
      mobilia: [null, Validators.compose([Validators.required, Validators.min(0), Validators.max(1)])],
      aservico: [null, Validators.compose([Validators.required, Validators.min(0), Validators.max(1)])],
      descricao: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      aterreno: [null, Validators.compose([Validators.required, Validators.min(0)])],
      aconstruida: [null, Validators.compose([Validators.required, Validators.min(0)])]
    })
    ;

  }

  OnSubmit() {
    console.log(this.novoImovelForm.value);
  }

}
