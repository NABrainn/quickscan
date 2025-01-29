import { computed, Injectable, signal } from "@angular/core";
import { InvoiceService } from "./entry-service";
import { ListItem } from "@dto/ListItem";

@Injectable({providedIn: 'root'})
export class ScannerService {

    constructor(private invoiceService: InvoiceService){}

    private _items = signal<ListItem[]>([]);
    items = computed(() => this._items());
    
    initEntries() {
        const items = this.invoiceService.invoiceToEntries();
        this._items.set(items);
    }

}