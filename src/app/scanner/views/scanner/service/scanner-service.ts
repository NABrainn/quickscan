import { computed, Injectable, signal } from "@angular/core";
import { InvoiceEntry } from "../../../dto/InvoiceEntry";
import { InvoiceService } from "./entry-service";

interface InvoiceEntryWithOpen extends InvoiceEntry {
  open: boolean;
}

@Injectable({providedIn: 'root'})
export class scannerService {

    constructor(private invoiceService: InvoiceService){}

    private _entries = signal<InvoiceEntryWithOpen[]>([]);
    computedEntries = computed(() => this._entries());

    private _showAll = signal(false);
    showAll = computed(() => this._showAll())

    initEntries() {
        const entries = this.invoiceService.invoiceToEntries();
        this._entries.set(entries.map(entry => ({...entry, open: false})))
    }

    openItem(next: InvoiceEntry) {
        this._entries.update(curr => curr.map(item => item.attribute === next.attribute && next.value instanceof Object ? {...item, open: !item.open} : item))    
    }

    toggleListContent() {
        this._showAll.update(curr => !curr)
    }
}