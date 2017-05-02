import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

}
export class Imovel {
  // chaves
  id_imovel: number;
  id_finalidade: number;
  id_tipo: number;
  cep: number;
  id_bairro: number;
  id_cidade: number;
  id_estado: number;

  // Dados estrangeiros
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  tipo: string;
  finalidade: string;
  uf: string;

  // Dados do imóvel
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

}
