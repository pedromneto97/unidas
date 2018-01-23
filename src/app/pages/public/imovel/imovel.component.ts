import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Imovel} from '../../../model/imovel';
import {BsModalRef, BsModalService, CarouselConfig} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.css'],
  providers: [
    {provide: CarouselConfig, useValue: {interval: 3000, noPause: false, showIndicators: true}}
  ]
})

export class ImovelComponent implements OnInit, OnDestroy {
  public InteresseForm: FormGroup;
  imovel: Imovel;
  id: number;
  inscricao: Subscription;
  interesse: any;
  modalref: BsModalRef;

  constructor(private rota: ActivatedRoute, private modalService: BsModalService,
              private formBuilder: FormBuilder) {
    this.formBuilder = new FormBuilder();
  }

  ngOnInit() {
    this.inscricao = this.rota.data.subscribe((data: { imovel: Imovel }) => {
      this.imovel = data.imovel;
      console.log(this.imovel);
    });
    this.InteresseForm = this.formBuilder.group({
      nome: [null, Validators.compose([Validators.required, Validators.min(3)])],
      telefone: [null, Validators.compose([])],
      email: [null, Validators.compose([])],
      id_imovel: [this.imovel.id]
    });
    this.formSubscribe();
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
    this.modalref.hide();
  }

  onSubmit(form) {
    console.log(form);
  }

  formSubscribe() {
    const changes$ = this.InteresseForm.valueChanges;
    changes$.subscribe(contato => {
      console.log(contato);
    });
  }

  canDeactivate() {
    if (window.confirm('Deseja mesmo fechar o formulário?') && this.InteresseForm.dirty) {
      this.modalref.hide();
    }
  }

  onClick(template: TemplateRef<any>) {
    this.modalref = this.modalService.show(template);
  }
}
