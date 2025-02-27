import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { Component, model, output, viewChildren } from '@angular/core';
import { IsArrayPipe } from '@pipes/is-array/is-array.pipe';
import { EditableFieldComponent } from '../../editable-field/editable-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CamelCaseToWordsPipe } from '@pipes/camel-case-to-words/camel-case-to-words.pipe';

@Component({
  selector: 'app-list-item-details',
  imports: [
    IsArrayPipe,
    KeyValuePipe,
    EditableFieldComponent,
    ReactiveFormsModule,
    TitleCasePipe,
    CamelCaseToWordsPipe
  ],
  templateUrl: './list-item-details.component.html'
})
export class ListItemDetailsComponent {

  fields = viewChildren(EditableFieldComponent);

  value = model<any | any[]>();
  isDataValid = model<boolean>(true);
  canEdit = model<boolean>(false);

  onEntryChange(index: number | null, change: any) {
    this.value.update(prev => {
      if(index === null) {
        prev[change.key] = change.value;
        return prev;
      }
      else {
        prev[index][change.key] = change.value;
        return prev;
      }
    })
    this.value.set(this.value());
  }

  onDataValidChange() {
    this.isDataValid.set(this.fields().every(el => el.form.controls.input.valid === true));
  }
}
