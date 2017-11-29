import {Bairro} from "./bairro";

export class Rua {
  public id: number;
  public id_bairro: number;
  public cep: number;
  public rua: string;
  public bairro: Bairro;
}
