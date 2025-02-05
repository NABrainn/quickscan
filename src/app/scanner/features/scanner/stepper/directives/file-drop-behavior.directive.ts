import { HttpClient } from '@angular/common/http';
import { Directive, HostListener, inject } from '@angular/core';
import { StepperComponent } from '../stepper-component';

@Directive({
  selector: '[fileDropBehavior]',
  standalone: true,
})
export class FileDropBehaviorDirective {

  private _stepper = inject(StepperComponent)
  private httpClient = inject(HttpClient);

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const data = event.dataTransfer?.files

    if(data) {
      const file: File = data[0];
      const formData = new FormData();

      formData.append("paragon", file.name)

      const upload$ = this.httpClient.post("api/scanner/parse", formData)

      upload$.subscribe({
        next: (v) => this._stepper?.selectNext(),
        error: (e) => {
          console.log('file upload failed');
        }
      });
    }
  }
}
