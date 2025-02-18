import { TitleCasePipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { TypeofPipe } from '@pipes/typeof/typeof.pipe';
import { ListItemDetailsComponent } from '../list-item-details/list-item-details.component';

@Component({
  selector: 'app-list-item',
  imports: [
    TitleCasePipe,
    TypeofPipe,
    ListItemDetailsComponent,
  ],
  templateUrl: './list-item.component.html'
})
export class ListItemComponent {

  isToggledDetails = signal<boolean>(false);

  key = input<string>();
  value = input<any>();

  toggleDetails() {
    this.isToggledDetails.update(prev => !prev);
  }
}
