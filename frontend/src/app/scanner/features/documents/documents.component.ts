import { Component, computed, inject, signal } from '@angular/core';
import { DocumentsService } from './services/documents.service';
import { map, catchError, tap } from 'rxjs';
import { of } from 'rxjs';
import { Document, Invoice, Receipt } from 'app/scanner/shared/types';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
    MatIcon
  ],
  templateUrl: './documents.component.html'
})
export class DocumentsComponent {
  private readonly service = inject(DocumentsService);

  private pageNumber: number = 0;
  private pageSize: number = 12;

  filterOption = FilterOption;

  private _hasMoreData: boolean = true;

  private readonly _filterBy = signal<FilterOption>(FilterOption.Receipt);
  readonly filterBy = computed(() => this._filterBy());

  private readonly _documents = signal<Document[]>([]);
  documents = computed(() => this._documents());
  documents$ = this.service.getDocumentsPage(this.pageNumber, this.pageSize).pipe(
    map((page: any) => page.content as Document[]),
    catchError((error) => {
      console.error('Error fetching documents:', error);
      return of([]);
    })
  ).subscribe((data) => this._documents.set(data));

  invoices = computed(() => this._documents().filter(doc => doc.type?.toLowerCase() === 'invoice') as Invoice[]);
  receipts = computed(() => this._documents().filter(doc => doc.type?.toLowerCase() === 'receipt') as Receipt[]);

  searchInput = new FormControl('');

  private scrollListener!: () => void;

  setupScrollListener() {
    this.scrollListener = () => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        if (!this._hasMoreData) return;
  
        this.pageNumber++;
        this.pageSize = 3;
        this.service.getDocumentsPage(this.pageNumber, this.pageSize).pipe(
          map((page: any) => page.content as Document[]),
          tap((data) => {
            if (data.length === 0) {
              this._hasMoreData = (false);
              window.removeEventListener('scroll', this.scrollListener);
            }
          }),
          catchError((error) => {
            console.error('Error fetching documents:', error);
            return of([]);
          })
        ).subscribe((data) => {
          if (data.length > 0) {
            this._documents.update(prev => [...prev, ...data]);
          }
        });
      }
    };
    window.addEventListener('scroll', this.scrollListener);
  }

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

  onSubmit(event: Event) {
    event.preventDefault()
  }

  ngOnInit() {
    this.setupScrollListener();
    this.onSearch();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollListener);
  }
}