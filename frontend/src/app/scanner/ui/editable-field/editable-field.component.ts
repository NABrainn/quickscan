import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
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

  canEdit = input<boolean>(false);

  key = input.required<any>();
  value = input<any>();

  valueChange = output<any>();
  validChange = output<boolean>();

  fc: FormControl = new FormControl({value: '', disabled: this.canEdit()}, [Validators.maxLength(50)]);
  matcher = new MyErrorStateMatcher();

  constructor() {
    effect(() => {
      if (this.canEdit()) {
        this.fc.enable({ emitEvent: false });
      } 
      else {
        this.fc.disable({ emitEvent: false });
      }
    });
  }

  updateValue() {
    this.valueChange.emit({
      key: this.key(), 
      value: this.fc.value,
    });
    this.validChange.emit(this.fc.valid);
  }

  ngOnInit() {
    this.fc.setValue(this.value());
    this.validChange.emit(this.fc.valid);
  }
}
