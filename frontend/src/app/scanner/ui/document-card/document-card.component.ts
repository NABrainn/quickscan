import { Component, computed, inject, input, model, output, signal } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card'; 
import { Invoice, Receipt } from 'app/scanner/shared/types';
import { ListComponent } from '../entry-list/list/list.component';
import { MatButton } from '@angular/material/button';
import { ListService } from '../entry-list/list.service';

@Component({
  selector: 'app-document-card',
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButton,
    ListComponent
  
  ],
  templateUrl: './document-card.component.html'
})
export class DocumentCardComponent {

  service = inject(ListService);

  _changedDocument = signal<Invoice | Receipt>({});
  changedDocument = computed(() => this._changedDocument());

  _isDataValid = this.service._isDataValid;
  isDataValid = this.service.isDataValid;

  private readonly _canEdit = signal<boolean>(false);
  canEdit = computed(() => this._canEdit());

  private readonly _isToggledDetails = signal<boolean>(false);
  isToggledDetails = computed(() => this._isToggledDetails());
  
  document = model<Invoice | Receipt>({});
  data = computed(() => {
    return Object.entries(this.document());
  });

  private readonly _errorMsg = signal<string>('');
  errorMsg = computed(() => this._errorMsg())

  requestRegenerate = output<void>();
  requestUpload = output<Invoice | Receipt>();

  regenerate() {
    this.requestRegenerate.emit();
  }

  edit() {
    this.service._canEdit.update(prev => !prev);
    this._isToggledDetails.update(prev => !prev);
  }

  save() {
    if(this.service.isDataValid())
      this.requestUpload.emit(this.changedDocument());
    else
      this._errorMsg.set('Dokument zawiera błędne dane');
  }

  ngOnInit() {
    this._changedDocument.set(this.document());
  }
}
