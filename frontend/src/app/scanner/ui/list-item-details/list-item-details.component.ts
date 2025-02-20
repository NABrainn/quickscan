import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { Component, computed, input, model, output, viewChildren } from '@angular/core';
import { IsArrayPipe } from '@pipes/is-array/is-array.pipe';
import { EditableFieldComponent } from '../editable-field/editable-field.component';
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

  canEdit = input<boolean>(false);
  validChange = output<boolean>();

  data = model<any | any[]>();

  updateData(index: number | null, change: any) {
    this.data.update(prev => {
      if(index === null) {
        prev[change.key] = change.value;
        return prev;
      }
      else {
        prev[index][change.key] = change.value;
        return prev;
      }
    })

    this.fields().every(el => el.fc.valid === true) ? this.validChange.emit(true) : this.validChange.emit(false);
  }
}
