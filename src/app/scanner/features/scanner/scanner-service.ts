import { computed, inject, Injectable, signal } from "@angular/core";
import { ListItem } from "@dto/ListItem";
import { InvoiceStore } from "@services/invoice-store";

@Injectable({providedIn: 'root'})
export class ScannerService {

    invoiceStore = inject(InvoiceStore);

    private _items = signal<ListItem[]>([]);
    items = computed(() => this._items());
    
    initEntries() {
        const items = this.invoiceStore.invoiceToEntries();
        this._items.set(items);
    }

}