import { AfterViewInit, Component, computed, ElementRef, input, model, output, viewChild } from '@angular/core';
import { Validator } from 'app/scanner/features/scanner/stepper/stepper-component';

@Component({
  selector: 'app-editable-label',
  standalone: true,
  imports: [],
  templateUrl: './editable-label.component.html',
  styleUrl: './editable-label.component.css'
})
export class EditableLabelComponent {

  canEdit = input<boolean>(false);
  value = input<any>();
  valueChange = output<any>();
  validator = model<Validator>();
  status = output<any>();

  control = computed(() => {
    switch(typeof this.value()) {
      case 'number':
        return this.validator()?.number;
      case 'string':
        return this.validator()?.string;
      default:
        return undefined;
    }
  })

  ref = viewChild('label', {read: ElementRef});

  update(event: Event) {
    const newValue = (event.target as HTMLInputElement)?.value;
    this.valueChange.emit(newValue);
    this.control()?.setValue(newValue);
    this.status.emit(this.control()?.status.toLowerCase());
  }
}
