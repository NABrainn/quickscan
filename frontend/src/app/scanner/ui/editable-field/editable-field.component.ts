import { Component, computed, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-editable-field',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './editable-field.component.html'
})
export class EditableFieldComponent {

  canEdit = input<boolean>(false);

  key = input<any>('');
  cKey = computed(() => this.key());

  value = input<any>();
  cValue = computed(() => this.value());

  control = input<FormControl>()

  valueChange = output<any>();
  validChange = output<boolean>();

  fc: FormControl =  new FormControl(this.cValue(), Validators.required);

  updateValue() {
    this.valueChange.emit({
      key: this.cKey(), 
      value: this.fc.value,
    });
    this.validChange.emit(this.fc.valid)
  }

  ngOnInit() {
    this.fc.setValue(this.cValue());
  }
}
