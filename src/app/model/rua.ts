import {Bairro} from "./bairro";

export class Rua {
  id: number;
  id_bairro: number;
  cep: number;
  rua: string;
  bairro: Bairro;
}
