import { TitleCasePipe } from '@angular/common';
import { Component, input, model, output, signal } from '@angular/core';
import { TypeofPipe } from '@pipes/typeof/typeof.pipe';
import { ListItemDetailsComponent } from '../list-item-details/list-item-details.component';
import { EditableFieldComponent } from '../editable-field/editable-field.component';

@Component({
  selector: 'app-list-item',
  imports: [
    TitleCasePipe,
    TypeofPipe,
    ListItemDetailsComponent,
    EditableFieldComponent
  ],
  templateUrl: './list-item.component.html'
})
export class ListItemComponent {

  isToggledDetails = signal<boolean>(false);
  isItemValid = signal<boolean>(true);
  itemValidChange = output<boolean>();

  key = input<string>();
  value = input<any>();

  toggleDetails() {
    if(this.isItemValid())
      this.isToggledDetails.update(prev => !prev);
  }

  updateItemValid(valid: boolean) {
    this.isItemValid.set(valid);
    this.itemValidChange.emit(valid)
  }
}
