import { TitleCasePipe } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { TypeofPipe } from '@shared/pipes/typeof/typeof.pipe';
import { ListItemDetailsComponent } from '../list-item-details/list-item-details.component';
import { CamelCaseToWordsPipe } from '@shared/pipes/camel-case-to-words/camel-case-to-words.pipe';
import { MatIcon } from '@angular/material/icon';
import { IsArrayPipe } from '@shared/pipes/is-array/is-array.pipe';
import { transition, trigger, useAnimation } from '@angular/animations';
import { popInAnimation, popOutAnimation } from 'app/shared/animations';
import { EditableFieldComponent } from '@ui/editable-field/editable-field.component';

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
  templateUrl: './list-item.component.html',
  animations: [    
    trigger('popInOut', [
      transition(':enter', [
        useAnimation(popInAnimation, {
          params: { zero: 0, one: 1, time: '400ms' }
        })
      ]),
      transition(':leave', [
        useAnimation(popOutAnimation, {
          params: { zero: 0, time: '400ms' }
        })
      ])
    ])
  ]
})
export class ListItemComponent {
  
  isToggledDetails = model<boolean>(false);
  isDataValid = model<boolean>(true);
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
