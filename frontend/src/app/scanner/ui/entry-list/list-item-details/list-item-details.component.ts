import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { Component, model, viewChildren } from '@angular/core';
import { IsArrayPipe } from '@pipes/is-array/is-array.pipe';
import { EditableFieldComponent } from '../../editable-field/editable-field.component';
import { CamelCaseToWordsPipe } from '@pipes/camel-case-to-words/camel-case-to-words.pipe';
import { transition, trigger, useAnimation } from '@angular/animations';
import { popInAnimation, popOutAnimation } from 'app/scanner/shared/animations';

@Component({
  selector: 'app-list-item-details',
  imports: [
    IsArrayPipe,
    KeyValuePipe,
    EditableFieldComponent,
    TitleCasePipe,
    CamelCaseToWordsPipe
  ],
  templateUrl: './list-item-details.component.html',
  animations: [    
    trigger('popInOut', [
      transition(':enter', [
        useAnimation(popInAnimation, {
          params: { zero: 0, one: 1, time: '150ms' }
        })
      ]),
      transition(':leave', [
        useAnimation(popOutAnimation, {
          params: { zero: 0, time: '150ms' }
        })
      ])
    ])
  ]
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
