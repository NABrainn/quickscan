import { Directive, HostListener, inject } from '@angular/core';
import { StepperComponent } from '../stepper-component';
import { HttpClient } from '@angular/common/http';

@Directive({
  selector: '[fileSelectBehavior]',
  standalone: true
})
export class FileSelectBehaviorDirective {

  private _stepper = inject(StepperComponent)
  private httpClient = inject(HttpClient);

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
