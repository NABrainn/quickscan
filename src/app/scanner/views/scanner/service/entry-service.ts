import { Injectable } from "@angular/core";
import { Invoice, Product, Vendor } from "../../../dto/Invoice";
import { EntrySet } from "../../../dto/EntrySet";
import { InvoiceStore } from "../data/invoice-store";


@Injectable({providedIn: 'root'})
export class EntryService {

    constructor(private store: InvoiceStore){}

    invoiceToEntries() {
        const invoice = this.store.getInvoice();
        const entries: EntrySet[] = [];

        Object.entries(invoice).forEach(([k, v]) => {
        entries.push({attribute: k, value: v, open: false} as EntrySet);
        })
        return entries;
    }

    instanceofObject(param: any): boolean {
        return param instanceof Object;
    }
}