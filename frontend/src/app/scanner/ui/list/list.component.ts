import { KeyValuePipe } from '@angular/common';
import { AfterViewInit, Component, input, output, viewChildren } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-list',
  imports: [
    KeyValuePipe,
    ListItemComponent
  ],
  templateUrl: './list.component.html'
})
export class ListComponent  implements AfterViewInit{

  document = input<{}>();
  items = viewChildren(ListItemComponent);
  allFieldsValid = output<boolean>();

  onItemValidChange() {
    console.log(this.items().every(el => el.isItemValid() === true))
    return this.items().every(el => el.isItemValid() === true) ? this.allFieldsValid.emit(true) : this.allFieldsValid.emit(false);
    
  }

  ngAfterViewInit(): void {
    this.items().forEach(it => console.log(it.isItemValid()))
  }
}
