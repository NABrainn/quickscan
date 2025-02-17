import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardModule} from '@angular/material/card'; 
import {MatTable, MatTableModule} from '@angular/material/table'; 

@Component({
  selector: 'app-document-card',
  imports: [
    MatCard,
    MatCardContent,
    MatTable
  
  ],
  templateUrl: './document-card.component.html'
})
export class DocumentCardComponent {

  helperInvoice() {
    const invoice: string = `{
      "type": "invoice",
      "numerFaktury": "11/M46/2815",
      "nrRachunkuBankowego": 123123123,
      "dataWystawienia": 9/11/2001,
      "dataSprzedaży": 10.4.2010,
      "razemNetto": 280.0,
      "razemStawka": 32.0,
      "razemPodatek": 98.0,
      "razemBrutto": 75.0,
      "waluta": PL,
      "formaPłatności": ziemniak,
      "odbiorca": {
        "nazwa": "ABC s.c. Sklep spożywczy",
        "nip": "1111111111",
        "adres": "Polanka 12/6, 54-365 Wrocław"
      },
      "sprzedawca": {
        "nazwa": "Firma przykładowa systemu InsERT GT",
        "nip": "1111111111",
        "adres": "Bławatkowa 25/3, 54-445 Wrocław"
      },
      "produkty": [
        {
          "nazwaProduktu": "banan",
          "ilość": 21,
          "cenaSuma": 37,
          "jednostkaMiary": "kilogram",
          "wartośćNetto": "41",
          "stawkaVAT": "11",
          "podatekVAT": "23%,
          "wartośćBrutto": "2323,
        },
        {
          "nazwaProduktu": "cebula",
          "ilość": 52,
          "cenaSuma": 85,
          "jednostkaMiary": "dekagram",
          "wartośćNetto": "74",
          "stawkaVAT": "63",
          "podatekVAT": "95%,
          "wartośćBrutto": "83,
        }
      ]
    }`
    return JSON.stringify(invoice);
  }
}
