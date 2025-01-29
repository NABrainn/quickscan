import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent {
  label = input<string>('Default');
  enabled = model<boolean>(true);
  selected = model<boolean>();

  toggleSelected() {
    this.selected.set(!this.selected())
  }
}
