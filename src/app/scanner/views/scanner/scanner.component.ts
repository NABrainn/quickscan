import { Component, computed, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { InvoiceService } from './service/entry-service';
import { ScannerService } from './service/scanner-service';

@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent {

  constructor(private invoiceService: InvoiceService, private scannerService: ScannerService){}

  getItems() {
    return this.scannerService.items();
  }
  
  ngOnInit(): void {
    this.scannerService.initEntries()
  }

}
