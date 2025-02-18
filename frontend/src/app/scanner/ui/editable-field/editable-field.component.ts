import { Component, computed, input, model, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field'; 

@Component({
  selector: 'app-editable-field',
  imports: [
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './editable-field.component.html'
})
export class EditableFieldComponent {
  canEdit = model<boolean>(false);

  key = input<any>('');
  cKey = computed(() => this.key());

  value = input<any>();
  cValue = computed(() => this.value());

  valueChange = output<any>();

  fc: FormControl =  new FormControl(this.cValue(), Validators.required);

  ngOnInit() {
    this.fc.setValue(this.cValue());
  }

  updateValue() {

    if(this.fc.valid)
      this.valueChange.emit({key: this.cKey(), value: this.fc.value});
  }
}
