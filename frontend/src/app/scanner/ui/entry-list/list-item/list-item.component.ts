import { TitleCasePipe } from '@angular/common';
import { Component, input, model, output, signal } from '@angular/core';
import { TypeofPipe } from '@pipes/typeof/typeof.pipe';
import { ListItemDetailsComponent } from '../list-item-details/list-item-details.component';
import { CamelCaseToWordsPipe } from '@pipes/camel-case-to-words/camel-case-to-words.pipe';
import { MatIcon } from '@angular/material/icon';
import { IsArrayPipe } from '@pipes/is-array/is-array.pipe';
import { EditableFieldComponent } from '../editable-field/editable-field.component';

@Component({
  selector: 'app-list-item',
  imports: [
    TitleCasePipe,
    CamelCaseToWordsPipe,
    TypeofPipe,
    ListItemDetailsComponent,
    EditableFieldComponent,
    MatIcon,
    IsArrayPipe,
  ],
  templateUrl: './list-item.component.html'
})
export class ListItemComponent {
  
  isToggledDetails = model<boolean>(false);
  isItemValid = signal<boolean>(true);

  key = input<string>();
  value = input<any>();
  documentType = input<string | undefined>();

  itemValidChange = output<boolean>();
  itemValueChange = output<any>();


  toggleDetails() {
    if(this.isItemValid())
      this.isToggledDetails.update(prev => !prev);
  }

  updateItem(valid: boolean) {
    this.isItemValid.set(valid);
    this.itemValidChange.emit(valid);
  }

  onValueChange(value: any) {
    this.itemValueChange.emit(value);
  }

  addProduct() {
    if(this.documentType() === 'invoice')
      this.value().push({
        nazwaProduktu: '',
        ilość: '',
        cenaSuma: '',
        jednostkaMiary: '',
        wartośćNetto: '',
        stawkaVAT: '',
        podatekVAT: '',
        wartośćBrutto: '',
      })
    else {
      this.value().push({
        nazwaProduktu: '',
        ilość: '',
        cenaSuma: ''
      })
    }
  }
}
