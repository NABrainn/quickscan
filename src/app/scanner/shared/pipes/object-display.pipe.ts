import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectDisplay',
  standalone: true
})
export class ObjectDisplayPipe implements PipeTransform {

  transform(object: any, ...args: unknown[]): any {
    if(!object) return '';

    if(Array.isArray(object)) {
      return object.flatMap(item => [Object.keys(item).map(key => `${key}: ${item[key]}`)]);
    }
    if(typeof object === 'string')
      return object;
    return Object.keys(object).map(key => `${key}: ${object[key]}`)
  }

}
