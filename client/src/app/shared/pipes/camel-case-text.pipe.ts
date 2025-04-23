import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseText',
  standalone: true
})
export class CamelCaseTextPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.split('').reduce((word, letter) => 
      letter.toUpperCase() === letter && word.at(-1) !== word.at(-1)?.toUpperCase()
        ?
      word + " " + letter
        :
      word + letter
    );
  }
}
