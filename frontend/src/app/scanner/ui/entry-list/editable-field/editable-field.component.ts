import { Component, effect, inject, input, model, output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatInput} from '@angular/material/input';
import { ListService } from '../list.service';

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

  private readonly service = inject(ListService);

  entry = model<{key: any, value: any}>();

  validChange = output<boolean>();

  form = new FormGroup({
    input: new FormControl('', [Validators.maxLength(50)])
  })

  matcher = new MyErrorStateMatcher();

  constructor() {
    effect(() => {
      if (this.service.canEdit()) {
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
    this.validChange.emit(this.form.controls.input.valid);
    console.log(this.entry())
  }

  ngOnInit() {
    this.form.controls.input.setValue(this.entry()?.value);
    this.service._isDataValid.set(this.form.controls.input.valid);
  }
}
