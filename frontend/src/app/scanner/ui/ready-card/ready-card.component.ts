import { Component, output } from '@angular/core';
import {MatFabButton} from '@angular/material/button'; 
import {MatCard, MatCardActions, MatCardHeader} from '@angular/material/card'; 
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-ready-card',
  imports: [
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatFabButton,
    MatIcon
  ],
  templateUrl: './ready-card.component.html'
})
export class ReadyCardComponent {
  requestNavigate = output<string>();

  goTo(uri: string) {
    this.requestNavigate.emit(uri);
  }
}
