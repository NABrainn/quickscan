import { Component, computed, model, output, signal } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card'; 
import { Invoice, Receipt } from 'app/scanner/shared/types';
import { ListComponent } from '../entry-list/list/list.component';
import { MatButton } from '@angular/material/button';

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

  private readonly _isDataValid = signal<boolean>(true);
  isDataValid = computed(() => this._isDataValid());

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
    this._canEdit.update(prev => !prev);
    this._isToggledDetails.update(prev => !prev);
  }

  save() {
    if(this.isDataValid())
      this.requestUpload.emit(this.document());
    else
      this._errorMsg.set('Dokument zawiera błędne dane');
  }

  onDataValidChange(valid: any) {
    this._isDataValid.set(valid);
  }
}
