import { KeyValuePipe } from '@angular/common';
import { Component, computed, input, model, Signal, viewChildren } from '@angular/core';
import { Invoice, Receipt } from 'app/shared/types';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-list',
  imports: [
    KeyValuePipe,
    ListItemComponent
  ],
  templateUrl: './list.component.html'
})
export class ListComponent {

  isDataValid = model<boolean>(true);
  canEdit = model<boolean>(false);
  document = model.required<Invoice | Receipt>();
  documentDisplay = computed(() => {
    const document = {...this.document()};
    delete document.type;
    delete document.id;
    return document;
  });
  documentType = computed(() => this.document().type);

  items = viewChildren(ListItemComponent);

  isToggledDetails = input<boolean>(false);

  onDataValidChange() {
    this.isDataValid.set(this.items().every(el => el.isDataValid() === true));
  }

  onEntryChange(entry: any){
    const ref: Signal<Receipt | Invoice> = computed(() => {
      this.document()[entry.key] = entry.value;
      return this.document();
    });    
    this.document.set(ref());
  }
}
