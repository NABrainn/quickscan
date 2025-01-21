import { Injectable } from "@angular/core";
import { InvoiceEntry } from "../../../dto/InvoiceEntry";
import { InvoiceStore } from "../data/invoice-store";


@Injectable({providedIn: 'root'})
export class InvoiceService {

    constructor(private store: InvoiceStore){}

    invoiceToEntries() {
        const invoice = this.store.getInvoice();
        const entries: InvoiceEntry[] = [];

        Object.entries(invoice).forEach(([k, v]) => {
        entries.push({attribute: k, value: v} as InvoiceEntry);
        })
        return entries;
    }
}