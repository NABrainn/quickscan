import { Component, computed, input, output, signal, viewChild } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card'; 

import { MatButton } from '@angular/material/button';
import { DocumentForm } from '@ui/document-form/document-form.component';
import { BillingDocument } from '@shared/services/document/document.service';

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

  documentForm = viewChild(DocumentForm)

  readonly #readonly = signal<boolean>(true);
  readonly = computed(() => this.#readonly())

  readonly #detailsOpen = signal<boolean>(false);
  detailsOpen = computed(() => this.#detailsOpen());

  readonly message = input<string>('');
  document = input<BillingDocument>();

  regenerateDocument = output<void>();
  saveDocument = output<BillingDocument | undefined>();

  regenerate() {
    this.regenerateDocument.emit();
  }

  edit() {
    this.#readonly.update(prev => !prev);
    this.#detailsOpen.update(prev => !prev);
  }

  save() {
    if(this.documentForm()?.form.valid) {      
      this.saveDocument.emit(this.document());
    }
  }
}
