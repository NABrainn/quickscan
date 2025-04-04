import { Component, computed, input, model, output, signal, viewChild } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card'; 

import { MatButton } from '@angular/material/button';
import { Document } from '@shared/services/document.service';
import { DocumentForm } from '@ui/document-form/document-form.component';

@Component({
  selector: 'app-document-menu',
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButton,
    DocumentForm
  
  ],
  templateUrl: './document-menu.component.html'
})
export class DocumentMenuComponent {

  form = viewChild(DocumentForm)

  readonly #canEdit = signal<boolean>(false);
  canEdit = computed(() => this.#canEdit())

  readonly message = input<string>('');
  readonly detailsOpen = model<boolean>(false);
  document = model<Document>();


  requestRegenerate = output<void>();
  requestUpload = output<Document | undefined>();

  regenerate() {
    this.requestRegenerate.emit();
  }

  edit() {
    this.#canEdit.update(prev => !prev);
    this.detailsOpen.update(prev => !prev);
  }

  save() {
    if(this.form()?.form.valid) {
      this.requestUpload.emit(this.document());
    }
  }
}
