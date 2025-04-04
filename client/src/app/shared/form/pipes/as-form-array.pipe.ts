import { Pipe, PipeTransform } from '@angular/core';
import { FormArray } from '@angular/forms';

@Pipe({
  name: 'asFormArray'
})
export class AsFormArrayPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): FormArray {
    return value as FormArray;
  }

}
