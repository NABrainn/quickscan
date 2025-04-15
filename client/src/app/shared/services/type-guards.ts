import { BillingDocument, Invoice } from "./document/document.service";

export function isInvoice(document: BillingDocument): document is Invoice {
  return document.type === 'invoice';
}