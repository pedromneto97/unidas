import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Imovel} from '../../../model/imovel';
import {BsModalRef, BsModalService, CarouselConfig} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InteresseService} from '../../../services/interesse.service';
import {HttpErrorResponse} from '@angular/common/http';
import {isObjectEmpty} from 'ngx-bootstrap/chronos/utils/type-checks';

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
  telefone: Subscription;
  email: Subscription;

  constructor(private rota: ActivatedRoute, private modalService: BsModalService,
              private formBuilder: FormBuilder, private inter: InteresseService) {
    this.formBuilder = new FormBuilder();
  }

  ngOnInit() {
    this.inscricao = this.rota.data.subscribe((data: { imovel: Imovel }) => {
      this.imovel = data.imovel;
    });
    if (!isObjectEmpty(this.imovel)) {
      this.InteresseForm = this.formBuilder.group({
        nome: [null, Validators.compose([Validators.required,
          Validators.pattern(new RegExp('(?=^.{2,60}$)^[A-Z][a-z]+(?:[ ](?:das?|dos?|de|e|[A-Z][a-z]+))*$'))])],
        telefone: [null, Validators.compose([Validators.required,
          Validators.pattern(new RegExp('^\\([1-9]{2}\\)[2-9][0-9]{3,4}\\-[0-9]{4}$', 'g'))])],
        email: [null, Validators.compose([Validators.required,
          Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
        ])],
        atendido: [false],
        id_imovel: [this.imovel.id]
      });
      this.formSubscribe();
    } else {
      this.imovel = null;
    }
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
    if (this.modalref != null) {
      this.modalref.hide();
    }
    if (this.imovel === null || !isObjectEmpty(this.imovel)) {
      this.telefone.unsubscribe();
      this.email.unsubscribe();
    }
  }

  onSubmit() {
    console.log(this.InteresseForm.value);
    if (this.InteresseForm.value.telefone === '') {
      this.InteresseForm.patchValue({
        telefone: null
      });
    }
    if (this.InteresseForm.value.email === '') {
      this.InteresseForm.patchValue({
        email: null
      });
    }
    this.inter.store(this.InteresseForm.value).catch((err: HttpErrorResponse) => {
      if (err) {
        window.alert(err.message);
      }
    });
    this.InteresseForm.reset();
    this.InteresseForm.patchValue({
      atendido: false,
      id_imovel: this.imovel.id
    });
    this.modalref.hide();
  }

  formSubscribe() {
    let flagt = false;
    let flage = false;
    this.telefone = this.InteresseForm.controls.telefone.valueChanges.subscribe(contato => {
      if (contato != null && !this.InteresseForm.controls.telefone.invalid && !flagt) {
        flagt = true;
        this.InteresseForm.controls.email.setValidators([Validators.compose([
          Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
        ])]);
        this.InteresseForm.controls.email.updateValueAndValidity({
          onlySelf: true
        });
      } else {
        if (flagt && this.InteresseForm.controls.telefone.invalid) {
          flagt = false;
          this.InteresseForm.controls.email.setValidators([Validators.compose([
            Validators.required,
            Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
          ])]);
          this.InteresseForm.controls.email.updateValueAndValidity({
            onlySelf: true
          });
        }
      }

    });

    this.email = this.InteresseForm.controls.email.valueChanges.subscribe(email => {
      if (email != null && !this.InteresseForm.controls.email.invalid && !flage) {
        flage = true;
        this.InteresseForm.controls.telefone.setValidators([
          Validators.compose([
            Validators.pattern(new RegExp('^\\([1-9]{2}\\)[2-9][0-9]{3,4}\\-[0-9]{4}$'))
          ])]);
        this.InteresseForm.controls.telefone.updateValueAndValidity({
          onlySelf: true
        });
      } else {
        if (flage && this.InteresseForm.controls.email.invalid) {
          flage = false;
          this.InteresseForm.controls.telefone.setValidators([Validators.compose([
            Validators.required,
            Validators.pattern(new RegExp('^\\([1-9]{2}\\)[2-9][0-9]{3,4}\\-[0-9]{4}$'))
          ])]);
          this.InteresseForm.controls.telefone.updateValueAndValidity({
            onlySelf: true
          });
        }
      }
    });
  }

  canDeactivate() {
    if (this.InteresseForm.dirty && window.confirm('Deseja mesmo fechar o formulário?')) {
      this.modalref.hide();
    }
  }

  onClick(template: TemplateRef<any>) {
    this.modalref = this.modalService.show(template);
  }
}
