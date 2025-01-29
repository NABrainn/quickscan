import { Injectable } from "@angular/core";
import { Client, Product, Vendor } from "@dto/Invoice";

//this is a service for providing data to the client
@Injectable({providedIn: 'root'})
export class InvoiceStore {
    getInvoice() {
        return {
            odbiorca: this.getClient(),
            sprzedawca: this.getVendor(),
            numerFaktury: "FV/2023/001",
            nrKontaRachunkuBankowego: "PL12345678901234567890123456",
            dataWystawienia: "2023-10-01",
            dataSprzedaży: "2023-10-01",
            razemNetto: 10.5,
            razemStawka: 23,
            razemPodatek: 2.415,
            razemBrutto: 12.915,
            waluta: "PLN",
            formaPlatnosci: "przelew",
            produkty: [
                this.getProduct(),
                this.getProduct()
            ]
        };
    }

    getClient(): Client {
        return {
            nazwa: "Firma ABC",
            nip: "1234567890",
            adres: "ul. Przykładowa 1, 00-000 Warszawa"
        };
    }

    getProduct(): Product {
        return {
            nazwaProduktu: "Papier A4",
            jednostkaMiary: "szt",
            ilosc: 10,
            wartoscNetto: 10.5,
            stawkaVat: 23,
            podatekVat: 2.415,
            brutto: 12.915
        };
    }

    getVendor(): Vendor {
        return {
            nazwa: "Dostawca XYZ",
            nip: "0987654321",
            adres: "ul. Handlowa 2, 11-111 Gdańsk"
        };
    }
}