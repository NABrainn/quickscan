import { Component, computed, inject, input, signal } from '@angular/core';
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

  service = inject(ScannerService);

  private readonly _canEdit = signal<boolean>(false);
  canEdit = computed(() => this._canEdit());

  private readonly _isToggledDetails = signal<boolean>(false);
  isToggledDetails = computed(() => this._isToggledDetails())

  formData = input.required<FormData>();
  
  document = input<Invoice | Receipt>({});
  data = computed(() => {
    return Object.entries(this.document());
  });

  regenerate() {
    this.service.uploadFile(this.formData());
    console.log('regenerate')
  }

  edit() {
    this._canEdit.update(prev => !prev);
    this._isToggledDetails.update(prev => !prev)
    console.log('edit')
  }

  save() {
    console.log('save')
  }

}
