import { Component, computed, effect, input, model, output, signal } from '@angular/core';
import { KeyValuePipe, NgClass, TitleCasePipe } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { IsObjectPipe } from '@pipes/is-object.pipe';
import { IsArrayPipe } from '@pipes/is-array.pipe';
import { CamelCaseToTextPipe } from '@pipes/camel-case-to-text-pipe';
import { ListItem } from '@dto/ListItem';
import { EditableLabelComponent } from 'app/scanner/ui/editable-label/editable-label.component';
import { Validator } from 'app/scanner/features/scanner/stepper/stepper-component';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [
    KeyValuePipe, 
    IsObjectPipe, 
    IsArrayPipe, 
    CamelCaseToTextPipe, 
    TitleCasePipe, 
    NgClass, 
    EditableLabelComponent
  ],
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

  validator = input<Validator>();
  _status = signal<any>('');
  status = output<any>();

  _item = model<ListItem | undefined>();
  item = computed(() => this._item())

  _isOpen = model<boolean>(false);
  canEdit = model<boolean>(false);

  _details = computed(() => {
    const it = this._item();
    return it ? Object.entries({ ...it.value }) : [];
  });

  getItemDetails(item: ListItem | undefined): any {
    if (!item) return [];
    return Object.entries({...item.value});
  }

  updateItemDetail(key: string, newValue: any) {
    const currentItem = this._item();
    if (currentItem) {
      const newValueObj = { ...currentItem.value, [key]: newValue };
      this._item.set({ ...currentItem, value: newValueObj });
    }
  }

  handle(event: Event) {
    this._status.set(event)
    this.status.emit(event)
  }
  
  openItem(item: ListItem | undefined) {
      this._isOpen.set(!this._isOpen())
  }
}
