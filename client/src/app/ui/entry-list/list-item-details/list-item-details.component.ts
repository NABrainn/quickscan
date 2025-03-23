import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { Component, computed, model, viewChildren } from '@angular/core';
import { IsArrayPipe } from '@shared/pipes/is-array/is-array.pipe';
import { CamelCaseToWordsPipe } from '@shared/pipes/camel-case-to-words/camel-case-to-words.pipe';
import { transition, trigger, useAnimation } from '@angular/animations';
import { EditableFieldComponent } from '@ui/editable-field/editable-field.component';
import { popInAnimation, popOutAnimation } from '@shared/animations';

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
  displayValue = computed(() => {
    if(Array.isArray(this.value())) {
      this.value().map((el: any) => {
        delete el['id'];
        return el;
      })
      return this.value();
    }
    else {
      delete this.value()['id'];
      return this.value();
    }
  })
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

  ngOnInit() {
    console.log(this.displayValue())
  }
}
