import { KeyValuePipe } from '@angular/common';
import { Component, input, output, viewChildren } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-list',
  imports: [
    KeyValuePipe,
    ListItemComponent
  ],
  templateUrl: './list.component.html'
})
export class ListComponent{

  document = input<{}>();
  items = viewChildren(ListItemComponent);
  allFieldsValid = output<boolean>();
  canEdit = input<boolean>(false);
  isToggledDetails = input<boolean>(false);

  onItemValidChange() {
    return this.items().every(el => el.isItemValid() === true) ? this.allFieldsValid.emit(true) : this.allFieldsValid.emit(false); 
  }
}
