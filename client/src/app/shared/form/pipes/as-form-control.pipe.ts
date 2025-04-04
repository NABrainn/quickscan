import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'asFormControl'
})
export class AsFormControlPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): FormControl {
    return value as FormControl;
  }

}
