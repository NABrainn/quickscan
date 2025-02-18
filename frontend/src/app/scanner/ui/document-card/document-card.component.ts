import { Component, computed, inject, input } from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card'; 
import { TestObjects } from 'app/scanner/shared/test-objects';
import { Invoice, Receipt } from 'app/scanner/shared/types';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-document-card',
  imports: [
    MatCard,
    MatCardContent,
    ListComponent
  
  ],
  templateUrl: './document-card.component.html'
})
export class DocumentCardComponent {

  document = input<Invoice | Receipt>({});
  data = computed(() => {
    return Object.entries(this.document());
  });

}
