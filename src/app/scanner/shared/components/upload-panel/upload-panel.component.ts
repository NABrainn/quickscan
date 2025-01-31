import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { DragoverBehaviorDirective } from '../../directives/dragover-behavior.directive';

@Component({
  selector: 'app-upload-panel',
  standalone: true,
  imports: [ButtonComponent, DragoverBehaviorDirective],
  templateUrl: './upload-panel.component.html',
  styleUrl: './upload-panel.component.css'
})
export class UploadPanelComponent {

  constructor(private httpClient: HttpClient) {}

  onFileSelected(event: Event) {
    const data: HTMLInputElement = event.target as HTMLInputElement

    if(data.files) {
      const file: File = data.files[0]
      const formData = new FormData();

      formData.append("paragon", file.name)

      const upload$ = this.httpClient.post("api/scanner/parse", formData)

      upload$.subscribe({
        next: (v) => console.log(v),
        error: (e) => console.log(e)
      });
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

  }

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
        next: (v) => console.log(v),
        error: (e) => console.log(e)
      });
    }
  }

  uploadFile(event: Event) {
    console.log(`Uploaded! ${event}`)
  }
}
