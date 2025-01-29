import { Component, computed, input, model } from '@angular/core';
import { ListItem } from '../../../dto/ListItem';
import { KeyValuePipe, NgClass, TitleCasePipe } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { CamelCaseToTextPipe } from '../../pipes/camel-case-to-text-pipe';
import { NewLinePipe } from '../../pipes/new-line.pipe';
import { IsObjectPipe } from '../../pipes/is-object.pipe';
import { IsArrayPipe } from '../../pipes/is-array.pipe';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [NewLinePipe, KeyValuePipe, IsObjectPipe, IsArrayPipe, CamelCaseToTextPipe, TitleCasePipe, NgClass],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
  animations: [
    trigger('popInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('150ms', style({ opacity: 0})),
      ]),
    ]),
  ],
})
export class ListItemComponent {

  _item = input<ListItem | undefined>();
  item = computed(() => this._item())

  _isOpen = model<boolean>(false);

  getItemDetails(item: ListItem | undefined): any {
    if (!item) return [];
    return Object.entries({...item.value});
  }

  openItem(item: ListItem | undefined) {
      this._isOpen.set(!this._isOpen())
  }

  ngOnDestroy() {
    console.log('component destroyed')
  }
}
