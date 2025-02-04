import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent {
  label = model<string | undefined>('Default');
  enabled = model<boolean>(true);
  selected = model<boolean>();
  tabClicked = output<TabComponent>()

  handleClick(tab: TabComponent) {
    this.tabClicked.emit(this)
  }
}
