import { Component, computed, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { EntryService } from './service/entry-service';

export interface InvoiceEntry {
  attribute: string,
  value: any
}

const DATA = [
  {attribute: "dataZakupu", value: '12-12-2019'},
  {attribute: "nazwaSklepu", value: 'biedronka'},
  {attribute: "kwotaCalkowita", value: 21.37},
  {attribute: "produkty", value: ['baton', 4.20, 28]}
]

@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent {
  isValid: WritableSignal<boolean> = signal(true);
  computedValid = computed(() => this.isValid())

  constructor(public scannerService: EntryService){}
  
  ngOnInit(): void {
    //
  }

}
