import { Component, computed, inject, input, model, output, signal } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card'; 
import { Invoice, Receipt } from 'app/scanner/shared/types';
import { ListComponent } from '../list/list.component';
import { MatButton } from '@angular/material/button';
import { ScannerService } from 'app/scanner/features/scanner/service/scanner.service';

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

  _changedDocument = signal<Invoice | Receipt>({});
  changedDocument = computed(() => this._changedDocument())

  private readonly _canEdit = signal<boolean>(false);
  canEdit = computed(() => this._canEdit());

  private readonly _isToggledDetails = signal<boolean>(false);
  isToggledDetails = computed(() => this._isToggledDetails())
  
  document = model<Invoice | Receipt>({});
  data = computed(() => {
    return Object.entries(this.document());
  });

  errorMsg = input<string>();

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
    this.requestUpload.emit(this.changedDocument());
  }
}
