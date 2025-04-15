import { KeyValuePipe } from '@angular/common';
import { AfterViewInit, Component, computed, effect, EmbeddedViewRef, inject, input, model, OnInit, output, signal, viewChild, viewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsFormArrayPipe } from '@shared/form/pipes/as-form-array.pipe';
import { AsFormControlPipe } from '@shared/form/pipes/as-form-control.pipe';
import { AsFormGroupPipe } from '@shared/form/pipes/as-form-group.pipe';
import { IsFormArrayPipe } from '@shared/form/pipes/is-form-array.pipe';
import { IsFormControlPipe } from '@shared/form/pipes/is-form-control.pipe';
import { IsFormGroupPipe } from '@shared/form/pipes/is-form-group.pipe';
import { FormDetailsComponent } from './form-details/form-details.component';
import { BillingDocument, InvoiceProduct } from '@shared/services/document/document.service';
import { isInvoice } from '@shared/services/type-guards';

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
    FormDetailsComponent
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

  private initDocumentForm(document: BillingDocument | undefined) {
    if(!document) return
    if(isInvoice(document)) {
      this.form = this.#fb.group({
        numerFaktury: [document.numerFaktury],
        nrRachunkuBankowego: [document.nrRachunkuBankowego],
        dataWystawienia: [document.dataWystawienia],
        dataSprzedaży: [document.dataSprzedaży],
        razemNetto: [document.razemNetto],
        razemRata: [document.razemRata],
        razemPodatek: [document.razemPodatek],
        razemBrutto: [document.razemBrutto],
        waluta: [document.waluta],
        formaPłatności: [document.formaPłatności],
        odbiorca: this.#fb.group({
          nazwa: [document.odbiorca.nazwa],
          nip: [document.odbiorca.nip],
          adres: [document.odbiorca.adres],
        }),
        sprzedawca: this.#fb.group({
          nazwa: [document.sprzedawca?.nazwa],
          nip: [document.sprzedawca?.nip],
          adres: [document.sprzedawca?.adres],
        }),
        produkty: this.#fb.array([]),
      });

      const formArray = this.form.get('produkty') as FormArray;
      document.produkty.forEach(product => formArray.push(this.#fb.group({
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
      this.form = this.#fb.group({
        dataZakupu: [''],
        nazwaSklepu: [''],
        kwotaCałkowita: [''],
        produkty: this.#fb.array([]),
      });
      const formArray = this.form.get('produkty') as FormArray;
      document.produkty?.forEach(product => formArray.push(this.#fb.group({
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
