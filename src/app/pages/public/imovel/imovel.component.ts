import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Imovel} from '../../../model/imovel';
import {BsModalRef, BsModalService, CarouselConfig} from 'ngx-bootstrap';

@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.css'],
  providers: [
    {provide: CarouselConfig, useValue: {interval: 3000, noPause: false, showIndicators: true}}
  ]
})

export class ImovelComponent implements OnInit, OnDestroy {

  imovel: Imovel;
  id: number;
  inscricao: Subscription;
  interesse: any;
  modalref: BsModalRef;

  constructor(private rota: ActivatedRoute, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.inscricao = this.rota.data.subscribe((data: { imovel: Imovel }) => {
      this.imovel = data.imovel;
      console.log(this.imovel);
    });
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
    this.modalref.hide();
  }

  onSubmit(form) {
    console.log(form);
  }

  onClick(template: TemplateRef<any>) {
    this.modalref = this.modalService.show(template);
  }
}
