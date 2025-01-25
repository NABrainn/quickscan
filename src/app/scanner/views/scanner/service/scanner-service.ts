import { computed, Injectable, signal } from "@angular/core";
import { ListItem } from "../../../dto/ListItem";
import { InvoiceService } from "./entry-service";

@Injectable({providedIn: 'root'})
export class ScannerService {

    constructor(private invoiceService: InvoiceService){}

    private _items = signal<ListItem[]>([]);
    items = computed(() => this._items());

    private _showAll = signal(false);
    showAll = computed(() => this._showAll())

    initEntries() {
        const items = this.invoiceService.invoiceToEntries();
        this._items.set(items);
    }

    toggleListContent() {
        this._showAll.update(curr => !curr)
    }
}