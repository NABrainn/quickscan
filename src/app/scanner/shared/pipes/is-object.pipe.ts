import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isObject',
  standalone: true
})
export class IsObjectPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): boolean {
    return typeof value === 'object';
  }

}
