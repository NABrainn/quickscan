import { Injectable } from "@angular/core";
import { Invoice, Receipt } from "./types";

@Injectable({
  providedIn: 'root'
})
export class TestObjects {
    helperInvoice(): Invoice {
        const json: string = `
        {
            "type": "invoice",
            "numerFaktury": "11/M46/2815",
            "nrRachunkuBankowego": "123123123",
            "dataWystawienia": "9/11/2001",
            "dataSprzedaży": "10.4.2010",
            "razemNetto": 280.0,
            "razemStawka": 32.0,
            "razemPodatek": 98.0,
            "razemBrutto": 75.0,
            "waluta": "PL",
            "formaPłatności": "ziemniak",
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
              "podatekVAT": "23%",
              "wartośćBrutto": "2323"
            },
            {
              "nazwaProduktu": "cebula",
              "ilość": 52,
              "cenaSuma": 85,
              "jednostkaMiary": "dekagram",
              "wartośćNetto": "74",
              "stawkaVAT": "63",
              "podatekVAT": "95%",
              "wartośćBrutto": "83"
            }
            ]
        }`
        return JSON.parse(json);
    }
    
    helperReceipt(): Receipt {
        const json: string = `
        {
          "type":"receipt",
          "dataZakupu":"2024-07-12 12:22:55",
          "nazwaSklepu":"Biedronka",
          "kwotaCałkowita":11.78,
          "produkty":[
              {
                "nazwaProduktu":"Rożek z Jabłk",
                "cenaSuma":2.79,
                "ilość":1
              },
              {
                "nazwaProduktu":"SOK POMARAŃ",
                "cenaSuma":8.99,
                "ilość":1
              }
          ]
        }
        ` 
        return JSON.parse(json);
    }      
}
