import { Component, computed, inject, signal } from '@angular/core';
import { DocumentsPageService } from './services/documents-page.service';
import { map, catchError, tap, Observable } from 'rxjs';
import { of } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ScrollerDirective } from './directives/scroller.directive';
import { DocumentMenuComponent } from 'app/ui/document-menu/document-menu.component';
import { MatMiniFabButton } from '@angular/material/button';
import {MatOption, MatSelect} from '@angular/material/select';

enum FilterOption {
  Invoice = "Faktury",
  Receipt = "Paragony",
  All = "Wszystkie"
}

@Component({
  selector: 'app-documents',
  imports: [
    ReactiveFormsModule,
    ScrollingModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSuffix,
    MatIcon,
    ScrollerDirective,
    MatIcon,
    MatSelect,
    MatOption
  ],
  templateUrl: './documents-page.component.html'
})
export class DocumentsPage {
  private readonly service = inject(DocumentsPageService);

  private pageNumber = signal<number>(0);
  private _hasMoreData = signal<boolean>(true);

  private readonly _modalOpen = signal<boolean>(false);
  modalOpen = computed(() => this._modalOpen());

  // private readonly _fetchedDocument = signal<Document>({});
  // fetchedDocument = computed(() => this._fetchedDocument());

  selected = FilterOption.All;

  private readonly _documents = signal<Document[]>([]);
  documents = computed(() => this._documents());
  // invoices = computed(() => this._documents().filter(doc => doc.type?.toLowerCase() === 'invoice') as Invoice[]);
  // receipts = computed(() => this._documents().filter(doc => doc.type?.toLowerCase() === 'receipt') as Receipt[]);

  private pageSize: number = 12;
  filterOptions: FilterOption[] = [FilterOption.Invoice, FilterOption.Receipt, FilterOption.All];

  searchInput = new FormControl('');


  //TODO: regex query by title (there is no title for documents currently)
  onSearch() {
    // let prev: any;

    // this.searchInput.valueChanges.subscribe({
    //   next: (val: string | null) => {
    //     clearTimeout(prev);
    //     prev = setTimeout(() => {
          
    //     }, 500);
    //   }
    // })
  }

  onScroll(){
    if(this._hasMoreData()) {
      this.pageNumber.update((prev) => prev += 1);
      this.fetchPage(this.pageNumber(), 3).subscribe((data) => this._documents.update((prev) => [...prev, ...data]))
    }
  }

  onDocumentClick(document: Document) {
    // document = this.service.findById(document.id).subscribe((data) => this._fetchedDocument.set(data));
    // this._modalOpen.set(true);
  }

  onSubmit(event: Event) {
    event.preventDefault()
  }

  fetchPage(pageNumber: number, pageSize: number): Observable<Document[]> {
    if (!this._hasMoreData) return of([]);

    return this.service.getDocumentsPage(pageNumber, pageSize).pipe(
      map((page: any) => page.content as Document[]),
      tap((data) => {
        if (data.length === 0) {
          this._hasMoreData.set(false);
        }
      }),
      catchError((error) => {
        console.error('Wystąpił błąd podczas pobierania dokumentów:', error);
        return of([]);
      })
    )  
  }

  onDelete() {
    // this.service.delete(this.fetchedDocument().id).subscribe({
    //   next: () => {
    //     this._documents.update(prev => prev.filter(doc => doc.id !== this.fetchedDocument().id))
    //     this.toggleModal();
    //   }
    // });
  }

  onRequestUpload(document: Document) {
    // this.service.update(document).subscribe({
    //   next: (currDoc: Document) => {
    //     this._documents.update(prev => {
    //       const idx = prev.findIndex(prevDoc => prevDoc.id === currDoc.id);
    //       const curr = [...prev];
    //       curr[idx] = currDoc;
    //       return curr; 
    //     })
    //   }
    // });
  }

  toggleModal() {
    this._modalOpen.update(prev => !prev);
  }

  ngOnInit() {
    this.fetchPage(this.pageNumber(), this.pageSize)?.subscribe((data) => this._documents.set(data));
    console.log(this._documents())
    this.onSearch();
  }
}