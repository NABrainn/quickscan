import { KeyValuePipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, input, model, OnInit, viewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsFormArrayPipe } from '@shared/form/pipes/as-form-array.pipe';
import { AsFormControlPipe } from '@shared/form/pipes/as-form-control.pipe';
import { AsFormGroupPipe } from '@shared/form/pipes/as-form-group.pipe';
import { IsFormArrayPipe } from '@shared/form/pipes/is-form-array.pipe';
import { IsFormControlPipe } from '@shared/form/pipes/is-form-control.pipe';
import { IsFormGroupPipe } from '@shared/form/pipes/is-form-group.pipe';
import { FormDetailsComponent } from './form-details/form-details.component';
import { BillingDocument, Invoice, Receipt } from '@shared/services/document/document.service';
import { CamelCaseTextPipe } from '@shared/pipes/camel-case-text.pipe';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { isInvoice } from '@shared/type-guards';

@Component({
  selector: 'app-document-form',
  imports: [
    KeyValuePipe,
    ReactiveFormsModule,
    IsFormControlPipe,
    IsFormGroupPipe,
    IsFormArrayPipe,
    AsFormGroupPipe,
    AsFormControlPipe,
    AsFormArrayPipe,
    FormDetailsComponent,
    CamelCaseTextPipe,
    TitleCasePipe,
    MatFormField,
    MatInput,
    NgClass
  ],
  templateUrl: './document-form.component.html'
})
export class DocumentForm implements OnInit {

  #fb = inject(FormBuilder);
  details = viewChildren(FormDetailsComponent)
  form!: FormGroup;

  detailsOpen = input.required<boolean>();
  readonly = input.required<boolean>();
  document = model<BillingDocument>();

  fields = viewChildren(MatFormField);

  private initDocumentForm(document: BillingDocument | undefined) {
    if(!document) return
    if(isInvoice(document)) {
      const invoice = document as Invoice
      this.form = this.#fb.group({
        numerFaktury: [invoice.numerFaktury],
        nrRachunkuBankowego: [invoice.nrRachunkuBankowego],
        dataWystawienia: [invoice.dataWystawienia],
        dataSprzedaży: [invoice.dataSprzedaży],
        razemNetto: [invoice.razemNetto],
        razemRata: [invoice.razemRata],
        razemPodatek: [invoice.razemPodatek],
        razemBrutto: [invoice.razemBrutto],
        waluta: [invoice.waluta],
        formaPłatności: [invoice.formaPłatności],
        odbiorca: this.#fb.group({
          nazwa: [invoice.odbiorca.nazwa],
          nip: [invoice.odbiorca.nip],
          adres: [invoice.odbiorca.adres],
        }),
        sprzedawca: this.#fb.group({
          nazwa: [invoice.sprzedawca?.nazwa],
          nip: [invoice.sprzedawca?.nip],
          adres: [invoice.sprzedawca?.adres],
        }),
        produkty: this.#fb.array([]),
      });

      const formArray = this.form.get('produkty') as FormArray;
      invoice.produkty.forEach(product => formArray.push(this.#fb.group({
        nazwaProduktu: [product.nazwaProduktu],
        ilość: [product.ilość],
        cenaSuma: [product.cenaSuma],
        jednostkaMiary: [product.jednostkaMiary],
        wartośćNetto: [product.wartośćNetto],
        stawkaVAT: [product.stawkaVAT],
        podatekVAT: [product.podatekVAT],
        wartośćBrutto: [product.wartośćBrutto],
      })))
    }

    else {
      const receipt = document as Receipt
      this.form = this.#fb.group({
        dataZakupu: [receipt.dataZakupu],
        nazwaSklepu: [receipt.nazwaSklepu],
        kwotaCałkowita: [receipt.kwotaCałkowita],
        produkty: this.#fb.array([]),
      });
      const formArray = this.form.get('produkty') as FormArray;
      receipt.produkty?.forEach(product => formArray.push(this.#fb.group({
        nazwaProduktu: [product.nazwaProduktu],
        ilość: [product.ilość],
        cenaSuma: [product.cenaSuma],
      })))
    }
  }

  toggleDetails(key: string) {
    const details = this.details().find(detail => detail.controlKey() === key);
    details?.visible.update(prev => !prev)
  }

  ngOnInit(): void {
    this.initDocumentForm(this.document())
  }
}
