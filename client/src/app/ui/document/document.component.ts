import { Component, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { Document, Invoice, Receipt } from '@shared/types';

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
  readonly document = input<Document>(() => {
    if(this.document()?.type === 'receipt')
      return this.document() as Receipt;
    return this.document() as Invoice;
  });
}
