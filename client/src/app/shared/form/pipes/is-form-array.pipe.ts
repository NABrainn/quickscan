import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';

@Pipe({
  name: 'isFormArray'
})
export class IsFormArrayPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): value is FormArray {
    return value instanceof FormArray;
  }

}
