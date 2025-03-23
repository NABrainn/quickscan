import { Component, computed, model, output, signal } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card'; 

import { MatButton } from '@angular/material/button';
import { Document, Invoice, Receipt } from '@shared/types';
import { ListComponent } from '@ui/entry-list/list/list.component';

@Component({
  selector: 'app-document-menu',
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButton,
    ListComponent
  
  ],
  templateUrl: './document-menu.component.html'
})
export class DocumentMenuComponent {

  private readonly _isDataValid = signal<boolean>(true);
  isDataValid = computed(() => this._isDataValid());

  readonly canEdit = model<boolean>(false);

  readonly isToggledDetails = model<boolean>(false);
  
  document = model<Document>({});
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
    this.canEdit.update(prev => !prev);
    this.isToggledDetails.update(prev => !prev);
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
