import { Component, effect, inject, input, model, output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatInput} from '@angular/material/input';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-editable-field',
  imports: [
    ReactiveFormsModule,
    MatInput,
  ],
  templateUrl: './editable-field.component.html'
})
export class EditableFieldComponent {

  entry = model<{key: any, value: any}>();
  isDataValid = model<boolean>(true);
  canEdit = model<boolean>(false);

  form = new FormGroup({
    input: new FormControl('', [Validators.maxLength(50)])
  })

  matcher = new MyErrorStateMatcher();

  constructor() {
    effect(() => {
      if (this.canEdit()) {
        this.form.controls.input.enable();
      } 
      else {
        this.form.controls.input.disable();
      }
    });
  }

  onInput() {
    this.entry.set({
      key: this.entry()?.key, 
      value: this.form.controls.input.value,
    });
    this.isDataValid.set(this.form.controls.input.valid);
  }

  ngOnInit() {
    this.form.controls.input.setValue(this.entry()?.value);
    this.isDataValid.set(this.form.controls.input.valid);
  }
}
