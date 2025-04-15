import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

export type BillingDocument = {
  id: string;
  type: 'invoice' | 'receipt';
  produkty: ReceiptProduct[] | InvoiceProduct[];
};

export type Invoice = BillingDocument & {
  type: 'invoice';
  numerFaktury: string;
  nrRachunkuBankowego: string;
  dataWystawienia: string;
  dataSprzedaży: string;
  razemNetto: number;
  razemRata: number;
  razemPodatek: number;
  razemBrutto: number;
  waluta: string;
  formaPłatności: string;
  odbiorca: {
    nazwa: string;
    nip: string;
    adres: string;
  };
  sprzedawca: {
    nazwa: string;
    nip: string;
    adres: string;
  };
  produkty: InvoiceProduct[];
};

export type InvoiceProduct = {
  nazwaProduktu: string;
  ilość: number;
  cenaSuma: number;
  jednostkaMiary: string;
  wartośćNetto: number;
  stawkaVAT: number;
  podatekVAT: number;
  wartośćBrutto: number;
};

export type Receipt = BillingDocument & {
  type: 'receipt';
  dataZakupu: string;
  nazwaSklepu: string;
  kwotaCałkowita: number;
  produkty: ReceiptProduct[];
};

export type ReceiptProduct = {
  nazwaProduktu: string;
  ilość: number;
  cenaSuma: number;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  #http = inject(HttpClient);

  readonly document = signal<BillingDocument | undefined>(undefined);
}
