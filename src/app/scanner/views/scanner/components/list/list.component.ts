import { Component, computed, model, signal, WritableSignal } from '@angular/core';

import { Invoice } from '../../../../dto/Invoice';
import { InvoiceService } from '../../service/entry-service';
import { NgClass, SlicePipe } from '@angular/common';
import { ListItem } from '../../../../dto/ListItem';
import { TypeCheckService } from '../../../../shared/type-check-service';
import { ScannerService } from '../../service/scanner-service';
import { ListItemComponent } from '../list-item/list-item.component';
import { CamelCaseToTextPipe } from '../../pipes/camel-case-to-text-pipe';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [SlicePipe, ListItemComponent,CamelCaseToTextPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  constructor(private invoiceService: InvoiceService, public tcService: TypeCheckService, private scannerService: ScannerService){}

  getItems() {
    return this.scannerService.items();
  }

  getShowAll() {
    return this.scannerService.showAll();
  }

  toggleListContent() {
    this.scannerService.toggleListContent();
  }

  ngOnInit() {

  }
}
