import { Component, computed, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { Document, Invoice, Receipt } from 'app/scanner/shared/types';

@Component({
  selector: 'app-document',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent
  ],
  templateUrl: './document.component.html'
})
export class DocumentComponent {
  readonly document = input<Document>();
  readonly receipt = computed(() => this.document() as Receipt);
  readonly invoice = computed(() => this.document() as Invoice);
}
