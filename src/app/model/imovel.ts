import {Rua} from "./rua";
import {Foto} from "./foto";
import {Tipo} from "./tipo";
import {Finalidade} from "./finalidade";

export class Imovel {
  public id: number;
  public id_finalidade: number;
  public id_tipo: number;
  public id_rua: number;

  // Dados do imóvel
  public numero: number;
  public valor: number;
  public dormitorio: number;
  public suite: number;
  public banheiro: number;
  public garagem: number;
  public mobilia: boolean;
  public aservico: boolean;
  public descricao: string;
  public aterreno: number;
  public aconstruida: number;
  public rua: Rua;
  public foto: Foto[];
  public tipo: Tipo;
  public finalidade: Finalidade;

}
