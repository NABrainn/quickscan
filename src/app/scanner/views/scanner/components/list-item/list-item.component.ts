import { Component, computed, Input, input, model, signal } from '@angular/core';
import { TypeCheckService } from '../../../../shared/type-check-service';
import { ScannerService } from '../../service/scanner-service';
import { ListItem } from '../../../../dto/ListItem';
import { CamelCaseToTextPipe } from '../../pipes/camel-case-to-text-pipe';
import { KeyValuePipe, NgClass } from '@angular/common';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CamelCaseToTextPipe, KeyValuePipe, NgClass],
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
  isOpen = computed(() => this._isOpen())

  isObject: boolean = false;
  isArray: boolean = false;


  constructor(private tcService: TypeCheckService, private scannerService: ScannerService){}

  getItems() {
    return this.scannerService.items();
  }
  getItemDetails(item: ListItem | undefined): any {
    if (!item) return [];
    return Object.entries({...item.value});
  }

  openItem(item: ListItem | undefined) {
      this._isOpen.set(!this.isOpen())
  }

  ngOnInit() {
    this.isObject = this.tcService.isObject(this.item()?.value);
    this.isArray = this.tcService.isArray(this._item()?.value);
  }
}
