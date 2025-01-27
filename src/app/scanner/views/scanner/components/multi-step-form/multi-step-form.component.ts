import { Component, computed, input, model, signal } from '@angular/core';
import { Tab } from '../../scanner.component';
import { NgClass } from '@angular/common';
import { UploadPanelComponent } from '../upload-panel/upload-panel.component';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [NgClass, UploadPanelComponent, ListComponent],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.css'
})
export class MultiStepFormComponent {

  _tabs = model<Tab[]>([
    {name: 'Upload', selected: true, enabled: true},
    {name: 'Ready', selected: false, enabled: true}
  ]);
  tabs = computed(() => this._tabs())

  _items = input<any[]>();
  items = computed(() => this._items())

  _selectedLink = signal<string | undefined>('Upload');
  selectedLink = computed(() => this._selectedLink())

  handleTabClick(index: number) {
    this._tabs.update((prev) =>
      prev.map((tab, i) => ({
        ...tab,
        selected: i === index,
      }))
    );
    this._selectedLink.set(this.tabs().find(tab => tab.selected)?.name)
  }
}
