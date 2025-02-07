import { Component, effect, input, model, output, viewChildren } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { Validator } from 'app/scanner/features/scanner/stepper/stepper-component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  items = model<any[]>();
  canEdit = model<boolean>(false);
  validator = input<Validator>();
  formStatus = output<any>();

  listItemsRef = viewChildren('ref', {read: ListItemComponent});

  ngAfterViewInit() {
    // this.formStatus.set(this.listItemsRef()?.some(el => el._status() === 'invalid'))
  }
}
