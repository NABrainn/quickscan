import { KeyValuePipe } from '@angular/common';
import { Component, computed, input, model, OnInit, output, viewChildren } from '@angular/core';
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
export class ListComponent implements OnInit{

  _document = model.required<Invoice | Receipt>();
  document = computed(() => this._document());
  documentType = computed(() => this._document().type)

  documentRef: Invoice | Receipt = {};

  items = viewChildren(ListItemComponent);

  canEdit = input<boolean>(false);
  isToggledDetails = input<boolean>(false);

  listValid = output<boolean>();
  documentChange = output<Invoice | Receipt>();

  onItemValidChange() {
    return this.items().every(el => el.isItemValid() === true) ? this.listValid.emit(true) : this.listValid.emit(false); 
  }

  onItemValueChange(entry: any){
    const document: any = this.documentRef;
    document[entry.key] = entry.value;
    this.documentChange.emit(document);
  }

  ngOnInit(): void {
    this.documentRef = {...this.document()};
  }  
}
