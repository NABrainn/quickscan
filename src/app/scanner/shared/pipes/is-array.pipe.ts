import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isArray',
  standalone: true
})
export class IsArrayPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    return Array.isArray(value);
  }

}
