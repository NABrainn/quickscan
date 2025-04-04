import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'asFormGroup'
})
export class AsFormGroupPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): FormGroup {
    return value as FormGroup;
  }
}
