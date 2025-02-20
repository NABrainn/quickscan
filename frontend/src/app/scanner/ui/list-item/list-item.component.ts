import { TitleCasePipe } from '@angular/common';
import { Component, input, model, output, signal } from '@angular/core';
import { TypeofPipe } from '@pipes/typeof/typeof.pipe';
import { ListItemDetailsComponent } from '../list-item-details/list-item-details.component';
import { EditableFieldComponent } from '../editable-field/editable-field.component';
import { CamelCaseToWordsPipe } from '@pipes/camel-case-to-words/camel-case-to-words.pipe';

@Component({
  selector: 'app-list-item',
  imports: [
    TitleCasePipe,
    CamelCaseToWordsPipe,
    TypeofPipe,
    ListItemDetailsComponent,
    EditableFieldComponent
  ],
  templateUrl: './list-item.component.html'
})
export class ListItemComponent {

  isToggledDetails = model<boolean>(false);

  isItemValid = signal<boolean>(true);
  itemValidChange = output<boolean>();

  key = input<string>();
  value = input<any>();
  canEdit = input<boolean>(false);

  toggleDetails() {
    if(this.isItemValid())
      this.isToggledDetails.update(prev => !prev);
  }

  updateItemValid(valid: boolean) {
    this.isItemValid.set(valid);
    this.itemValidChange.emit(valid)
  }
}
