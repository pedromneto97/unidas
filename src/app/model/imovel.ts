import {Rua} from "./rua";
import {Foto} from "./foto";
import {Tipo} from "./tipo";
import {Finalidade} from "./finalidade";

export class Imovel {
  id: number;
  id_finalidade: number;
  id_tipo: number;
  id_rua: number;

  // Dados do imóvel
  numero: number;
  valor: number;
  dormitorio: number;
  suite: number;
  banheiro: number;
  garagem: number;
  mobilia: boolean;
  aservico: boolean;
  descricao: string;
  aterreno: number;
  aconstruida: number;
  rua: Rua;
  foto: Foto[];
  tipo: Tipo;
  finalidade: Finalidade;

}
