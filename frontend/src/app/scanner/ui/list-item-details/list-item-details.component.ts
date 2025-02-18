import { KeyValuePipe } from '@angular/common';
import { Component, computed, effect, input, model } from '@angular/core';
import { IsArrayPipe } from '@pipes/is-array/is-array.pipe';
import { EditableFieldComponent } from '../editable-field/editable-field.component';

@Component({
  selector: 'app-list-item-details',
  imports: [
    IsArrayPipe,
    KeyValuePipe,
    EditableFieldComponent
  ],
  templateUrl: './list-item-details.component.html'
})
export class ListItemDetailsComponent {

  data = model<any | any[]>();
  cData = computed(() => this.data());

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
  }
}
