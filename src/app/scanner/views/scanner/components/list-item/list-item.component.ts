import { Component, computed, Input, input, model, signal } from '@angular/core';
import { ListItem } from '../../../../dto/ListItem';
import { CamelCaseToTextPipe } from '../../pipes/camel-case-to-text-pipe';
import { KeyValuePipe, NgClass, TitleCasePipe } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CamelCaseToTextPipe, KeyValuePipe, TitleCasePipe, NgClass],
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

  _isOpen = signal<boolean>(false);
  isOpen = computed(() => this._isOpen());
  
  _isObject = signal<boolean>(false);
  isObject = computed(() => this._isObject());
  
  _isArray = signal<boolean>(false);
  isArray = computed(() => this._isArray());

  constructor(){}

  getItemDetails(item: ListItem | undefined): any {
    if (!item) return [];
    return Object.entries({...item.value});
  }

  openItem(item: ListItem | undefined) {
      this._isOpen.set(!this.isOpen())
  }

  ngOnInit() {
    this._isObject.set(this.item()?.value instanceof Object);
    this._isArray.set(Array.isArray(this.item()?.value));
  }

  ngOnDestroy() {
    console.log('component destroyed')
  }
}
