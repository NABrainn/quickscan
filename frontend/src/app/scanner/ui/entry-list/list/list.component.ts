import { KeyValuePipe } from '@angular/common';
import { Component, computed, inject, input, model, OnInit, output, viewChildren } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { Invoice, Receipt } from 'app/scanner/shared/types';

@Component({
  selector: 'app-list',
  imports: [
    KeyValuePipe,
    ListItemComponent
  ],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  isDataValid = model<boolean>(true);
  canEdit = model<boolean>(false);
  document = model.required<Invoice | Receipt>();
  documentDisplay = computed(() => {
    const document = {...this.document()};
    delete document.type;
    return document;
  });
  documentType = computed(() => this.document().type);

  documentRef: Invoice | Receipt = {};

  items = viewChildren(ListItemComponent);

  isToggledDetails = input<boolean>(false);

  onDataValidChange() {
    this.isDataValid.set(this.items().every(el => el.isDataValid() === true));
  }

  onEntryChange(entry: any){
    const document: any = this.documentRef;
    document[entry.key] = entry.value;
    this.document.set(document);
  }

  ngOnInit(): void {
    this.documentRef = {...this.document()};
  }  
}
