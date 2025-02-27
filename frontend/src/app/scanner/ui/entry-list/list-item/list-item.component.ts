import { TitleCasePipe } from '@angular/common';
import { Component, input, model, output, signal } from '@angular/core';
import { TypeofPipe } from '@pipes/typeof/typeof.pipe';
import { ListItemDetailsComponent } from '../list-item-details/list-item-details.component';
import { CamelCaseToWordsPipe } from '@pipes/camel-case-to-words/camel-case-to-words.pipe';
import { MatIcon } from '@angular/material/icon';
import { IsArrayPipe } from '@pipes/is-array/is-array.pipe';
import { EditableFieldComponent } from '../../editable-field/editable-field.component';

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
  isDataValid = model<boolean>(false);
  canEdit = model<boolean>(false);

  entry = model<{key: string, value: any}>();
  documentType = input<string | undefined>();

  toggleDetails() {
    this.isToggledDetails.update(prev => !prev);
  }

  onDataValidChange(valid: boolean) {
    this.isDataValid.set(valid);
  }

  onEntryChange(value: any) {
    this.entry.set(value);
  }

  addProduct() {
    if(this.documentType() === 'invoice')
      this.entry()?.value.push({
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
      this.entry()?.value.push({
        nazwaProduktu: '',
        ilość: '',
        cenaSuma: ''
      })
    }
  }
}
