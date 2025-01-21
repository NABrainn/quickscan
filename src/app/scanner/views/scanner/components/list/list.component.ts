import { Component, computed, model, signal, WritableSignal } from '@angular/core';

import { Invoice } from '../../../../dto/Invoice';
import { InvoiceService } from '../../service/entry-service';
import { JsonPipe, KeyValuePipe, NgClass } from '@angular/common';
import { InvoiceEntry } from '../../../../dto/InvoiceEntry';
import { SeparatorPipe } from '../../pipes/entry-pipe';
import { TypeCheckService } from '../../../../shared/type-check-service';
import { scannerService } from '../../service/scanner-service';

interface InvoiceEntryWithOpen extends InvoiceEntry {
  open: boolean;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [SeparatorPipe, JsonPipe, NgClass],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  constructor(private invoiceService: InvoiceService, public tcService: TypeCheckService, private scannerService: scannerService){}

  openItem(next: InvoiceEntry) {
    this.scannerService.openItem(next)
  }

  getComputedEntries() {
    return this.scannerService.computedEntries();
  }

  getEntryValues(entry: InvoiceEntry) {
    if(Array.isArray(entry.value)){    
      return entry.value.map(o => Object.entries(o));
    }
    return Object.entries({...entry.value})
  }

  ngOnInit() {

  }
}
