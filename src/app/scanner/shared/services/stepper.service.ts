import { computed, Injectable, signal } from '@angular/core';
import { TabComponent } from '@components/tab/tab.component';
import { Tab } from '@dto/Tab';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  _tabs = signal<TabComponent[]>([]);
  tabs = computed(() => this._tabs())

  _selected = signal<string | undefined>('');

  constructor() {

  }

  handleTabClick(label: string) {
    this.tabs().map(component => component.selected.set(component.label() === label))
    this._selected.set(label);
  }
}
