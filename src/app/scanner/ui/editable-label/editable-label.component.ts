import { Component, input } from '@angular/core';

@Component({
  selector: 'app-editable-label',
  standalone: true,
  imports: [],
  templateUrl: './editable-label.component.html',
  styleUrl: './editable-label.component.css'
})
export class EditableLabelComponent {
  canEdit = input<boolean>(false);
}
