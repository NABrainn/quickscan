import { Component, computed, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { InvoiceService } from './service/entry-service';
import { scannerService } from './service/scanner-service';

export interface InvoiceEntry {
  attribute: string,
  value: any
}

@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent {

  constructor(private invoiceService: InvoiceService, private scannerService: scannerService){}

  getComputedEntries() {
    console.log(this.scannerService.computedEntries().length)
    return this.scannerService.computedEntries();
  }
  
  ngOnInit(): void {
    this.scannerService.initEntries()
  }

}
