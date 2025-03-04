import { Component, computed, inject, Signal, signal } from '@angular/core';
import { DocumentsService } from './services/documents.service';
import {map} from 'rxjs';
import { Document, Invoice, Receipt } from 'app/scanner/shared/types';
import { toSignal } from '@angular/core/rxjs-interop';

enum Filter {
  Invoice,
  Receipt,
  All
}

@Component({
  selector: 'app-documents',
  imports: [
  ],
  templateUrl: './documents.component.html'
})
export class DocumentsComponent {

  private readonly service = inject(DocumentsService);

  filterEnum = Filter;
  private readonly _filterBy = signal<Filter>(Filter.Receipt);
  readonly filterBy = computed(() => this._filterBy());
  
  documents: Signal<Document[] | undefined> = toSignal(this.service.getDocumentsPage().pipe(
    map((page: any) => page.content as Document[]),
  ));

  readonly invoices = computed(() => this.documents()?.filter(doc => doc.type === 'invoice') as Invoice[]);
  readonly receipts = computed(() => this.documents()?.filter(doc => doc.type === 'receipt') as Receipt[]);

}
