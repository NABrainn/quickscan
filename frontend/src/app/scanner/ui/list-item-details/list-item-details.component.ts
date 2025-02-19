import { KeyValuePipe } from '@angular/common';
import { AfterViewInit, Component, computed, model, output, viewChildren } from '@angular/core';
import { IsArrayPipe } from '@pipes/is-array/is-array.pipe';
import { EditableFieldComponent } from '../editable-field/editable-field.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-item-details',
  imports: [
    IsArrayPipe,
    KeyValuePipe,
    EditableFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './list-item-details.component.html'
})
export class ListItemDetailsComponent implements AfterViewInit {

  fields = viewChildren(EditableFieldComponent);

  data = model<any | any[]>();
  cData = computed(() => this.data());

  validChange = output<boolean>();

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

  ngAfterViewInit(): void {
    
  }
}
