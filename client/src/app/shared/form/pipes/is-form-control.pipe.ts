import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
  name: 'isFormControl'
})
export class IsFormControlPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): value is FormControl {
    return value instanceof FormControl;
  }

}
