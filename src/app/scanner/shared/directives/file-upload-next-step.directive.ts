import { HttpClient } from '@angular/common/http';
import { Directive, HostListener, inject } from '@angular/core';
import { StepperComponent } from '@components/multi-step-form/stepper-component';

@Directive({
  selector: '[appFileUploadNextStep]',
  standalone: true,
})
export class FileUploadNextStepDirective {

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

  @HostListener('change', ['$event'])
  onFileSelected(event: Event) {
    const data: HTMLInputElement = event.target as HTMLInputElement

    if(data.files) {
      const file: File = data.files[0]
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
