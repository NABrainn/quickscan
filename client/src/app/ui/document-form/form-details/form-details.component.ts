import { Component, input, model, signal } from '@angular/core';

@Component({
  selector: 'app-form-details',
  imports: [],
  templateUrl: './form-details.component.html'
})
export class FormDetailsComponent {
  controlKey = input.required();
  visible = model<boolean>(true);
}
