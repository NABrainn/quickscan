import { Component, computed, inject, signal } from '@angular/core';
import { DocumentsService } from './services/documents.service';
import { map, catchError, tap, Observable } from 'rxjs';
import { of } from 'rxjs';
import { Document, Invoice, Receipt } from 'app/scanner/shared/types';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ScrollerDirective } from './directives/scroller.directive';

enum FilterOption {
  Invoice,
  Receipt,
  All
}

@Component({
  selector: 'app-documents',
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    ScrollingModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSuffix,
    MatIcon,
    ScrollerDirective
  ],
  templateUrl: './documents.component.html'
})
export class DocumentsComponent {
  private readonly service = inject(DocumentsService);

  private pageNumber = signal<number>(0);
  private pageSize: number = 3;

  filterOption = FilterOption;

  private _hasMoreData = signal<boolean>(true);

  private readonly _filterBy = signal<FilterOption>(FilterOption.Receipt);
  readonly filterBy = computed(() => this._filterBy());

  private readonly _documents = signal<Document[]>([]);
  documents = computed(() => this._documents());

  invoices = computed(() => this._documents().filter(doc => doc.type?.toLowerCase() === 'invoice') as Invoice[]);
  receipts = computed(() => this._documents().filter(doc => doc.type?.toLowerCase() === 'receipt') as Receipt[]);

  searchInput = new FormControl('');

  private scrollListener!: () => void;



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
    this.pageNumber.update((prev) => prev += 1);
    this.fetchPage(this.pageNumber(), 3).subscribe((data) => this._documents.update((prev) => [...prev, ...data]))
  }

  onSubmit(event: Event) {
    event.preventDefault()
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  fetchPage(pageNumber: number, pageSize: number): Observable<Document[]> {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      if (!this._hasMoreData) return of([]);

      return this.service.getDocumentsPage(pageNumber, pageSize).pipe(
        map((page: any) => page.content as Document[]),
        tap((data) => {
          console.log(data.length)
          if (data.length === 0) {
            this._hasMoreData.set(false);
            window.removeEventListener('scroll', this.scrollListener);
          }
        }),
        catchError((error) => {
          console.error('Error fetching documents:', error);
          return of([]);
        })
      )
    }
    return of([]);
  }

  ngOnInit() {
    this.fetchPage(this.pageNumber(), this.pageSize)?.subscribe((data) => this._documents.set(data));
    this.onSearch();
  }
}