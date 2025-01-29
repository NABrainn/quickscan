import { Injectable } from "@angular/core";
import { ListItem } from "@dto/ListItem";
import { InvoiceStore } from "@services/invoice-store";

@Injectable({providedIn: 'root'})
export class InvoiceService {

    constructor(private store: InvoiceStore){}

    invoiceToEntries() {
        const invoice = this.store.getInvoice();
        const entries: ListItem[] = [];


        Object.entries(invoice).forEach(([k, v]) => {
            entries.push({attribute: k, value: v} as ListItem);
        })
        return entries;
    }
}