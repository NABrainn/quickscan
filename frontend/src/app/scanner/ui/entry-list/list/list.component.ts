import { KeyValuePipe } from '@angular/common';
import { Component, computed, inject, input, model, OnInit, output, viewChildren } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { Invoice, Receipt } from 'app/scanner/shared/types';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list',
  imports: [
    KeyValuePipe,
    ListItemComponent
  ],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  service = inject(ListService);

  _document = model.required<Invoice | Receipt>();
  documentDisplay = computed(() => {
    const document = {...this._document()};
    delete document.type;
    return document;
  });

  documentType = computed(() => this._document().type);

  documentRef: Invoice | Receipt = {};

  items = viewChildren(ListItemComponent);

  isToggledDetails = input<boolean>(false);
  documentChange = output<Invoice | Receipt>();

  onItemValidChange() {
    return this.items().every(el => el.isItemValid() === true) ? this.service._isDataValid.set(true) : this.service._isDataValid.set(false); 
  }

  onItemValueChange(entry: any){
    const document: any = this.documentRef;
    document[entry.key] = entry.value;
    this.documentChange.emit(document);
  }

  ngOnInit(): void {
    this.documentRef = {...this._document()};
  }  
}
