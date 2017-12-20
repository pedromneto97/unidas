import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Imovel} from "../model/imovel";
import {ImovelService} from "../services/imovel.service";

@Injectable()
export class ImovelResolver implements Resolve<Imovel> {
  constructor(private imovel: ImovelService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const id = route.params['id'];
    let tipo = route.params['tipo'];
    let finalidade = route.params['finalidade'];
    if (tipo != null) {
      switch (tipo) {
        case 'residencial':
          tipo = 1;
          break;
        case 'Residencial':
          tipo = 1;
          break;
        case 'comercial':
          tipo = 2;
          break;
        case 'Comercial' :
          tipo = 2;
          break;
        case 'kitnet':
          tipo = 3;
          break;
        case 'Kitnet':
          tipo = 3;
          break;
        case 'rural':
          tipo = 4;
          break;
        case 'Rural':
          tipo = 4;
          break;
        case 'terreno':
          tipo = 5;
          break;
        case 'Terreno':
          tipo = 5;
          break;
        default:
          tipo = 0;
      }
      if (finalidade != null) {
        switch (finalidade) {
          case 'venda':
            finalidade = 1;
            break;
          case 'Venda':
            finalidade = 1;
            break;
          case 'aluguel':
            finalidade = 2;
            break;
          case 'Aluguel':
            finalidade = 2;
            break;
          default:
            finalidade = 0;
        }
        return this.imovel.getTipoFinalidade(tipo, finalidade);
      } else {
        //Somente tipo
        return this.imovel.getTipo(tipo);
      }
    } else {
      if (finalidade != null) {
        //Somente Finalidade
        switch (finalidade) {
          case 'venda':
            finalidade = 1;
            break;
          case 'Venda':
            finalidade = 1;
            break;
          case 'aluguel':
            finalidade = 2;
            break;
          case 'Aluguel':
            finalidade = 2;
            break;
          default:
            finalidade = 0;
        }
        this.imovel.getFinalidade(finalidade);
      }
    }
    if (id != null) {
      return this.imovel.getImovel(id);
    } else {
      if (route.url.length === 0)
        return this.imovel.getImoveisLimite();
      return this.imovel.getImoveis();
    }
  }
}
