import { Component, output } from '@angular/core';
import {MatFabButton} from '@angular/material/button'; 
import {MatCard, MatCardFooter, MatCardHeader} from '@angular/material/card'; 
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-ready-card',
  imports: [
    MatCard,
    MatCardFooter,
    MatCardHeader,
    MatFabButton,
    MatIcon
  ],
  templateUrl: './ready-card.component.html'
})
export class ReadyCardComponent {
  requestNavigate = output<{uri: string, reset?: boolean}>();

  goTo(uri: string, reset?: boolean) {
    this.requestNavigate.emit({uri, reset});
  }
}
