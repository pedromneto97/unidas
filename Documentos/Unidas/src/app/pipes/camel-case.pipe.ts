import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const values = value.split(' ');
    let result = '';

    for (let v of values) {
      result += v.substr(0, 1).toUpperCase() + v.substr(1).toLowerCase() + ' ';
    }

    return result;
  }

}
