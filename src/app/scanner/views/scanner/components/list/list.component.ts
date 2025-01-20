import { Component, computed, signal, WritableSignal } from '@angular/core';

import { Invoice } from '../../../../dto/Invoice';
import { EntryService } from '../../service/entry-service';
import { KeyValuePipe, NgClass } from '@angular/common';
import { EntrySet } from '../../../../dto/EntrySet';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [KeyValuePipe, NgClass],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  constructor(public entryService: EntryService){}

  private _entries = signal<EntrySet[]>([]);
  computedEntries = computed(() => this._entries());

  openItem(input: EntrySet) {
    this._entries.update(curr => curr.map(item => item.attribute === input.attribute && input.value instanceof Object ? {...item, open: !item.open} : item))
  }

  ngOnInit() {
    this._entries.set(this.entryService.invoiceToEntries())
  }
}
