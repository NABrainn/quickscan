import { BillingDocument, Invoice } from "./services/document/document.service";

export function isInvoice(document: BillingDocument): document is Invoice {
  return document.type === 'invoice';
}