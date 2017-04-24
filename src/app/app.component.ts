import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

}
export class Imovel {
  id: number;
  numero: number;
  valor: number;
  dormitorio: number;
  suite: number;
  banheiros: number;
  garagem: number;
  mobilia: boolean;
  aservico: boolean;
  descricao: string;
  aterreno: number;
  aconstruida: number;
  finalidade_id: number;
  tipo_id: number;
  rua_cep: number;
}
