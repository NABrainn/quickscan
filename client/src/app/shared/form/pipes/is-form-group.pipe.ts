import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'isFormGroup'
})
export class IsFormGroupPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): value is FormGroup {
    return value instanceof FormGroup;
  }

}
