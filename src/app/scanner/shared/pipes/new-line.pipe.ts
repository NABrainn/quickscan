import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLine',
  standalone: true
})
export class NewLinePipe implements PipeTransform {

  transform(value: string | any[], ...args: unknown[]): string {
    if(Array.isArray(value))
      return value.join(',').replaceAll(',', '\n')
    return value
  }

}
