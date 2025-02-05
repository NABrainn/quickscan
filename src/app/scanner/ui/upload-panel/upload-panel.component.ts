import { Component, inject, input, model, output } from '@angular/core';
import { LoadingBarComponent } from 'app/scanner/ui/loading-bar/loading-bar.component';
import { DragoverBehaviorDirective } from 'app/scanner/shared/directives/dragover-behavior.directive';
import { ButtonComponent } from '../button/button.component';

export type EmitResponse = {
  message: string,
  data?: FormData
}

@Component({
  selector: 'app-upload-panel',
  standalone: true,
  imports: [ButtonComponent, DragoverBehaviorDirective, LoadingBarComponent],
  templateUrl: './upload-panel.component.html',
  styleUrl: './upload-panel.component.css'
})
export class UploadPanelComponent {

  error = input<string>('');
  formData = output<EmitResponse>();

  selectFile(event: Event) {
    const data: HTMLInputElement = event.target as HTMLInputElement;
    
    if(data.files) {
      const file: File = data.files[0];

      if(!file.type.includes('image/jpeg')) 
        return this.formData.emit({
          message: 'Niewłaściwy format pliku. Spróbuj ponownie', 
          data: undefined
        });
      

      if(Math.round(file.size / 1024) > 5000) 
        return this.formData.emit({
          message: 'Plik jest zbyt duży.', 
          data: undefined
        });
      
      const formData = new FormData();

      formData.append("paragon", file.name);
      return this.formData.emit({
        message: '',
        data: formData
      });
    }

    return this.formData.emit({
      message: 'Wystąpił błąd odczytu pliku.',
      data: undefined
    });
  }

  dropFile(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const data = event.dataTransfer?.files

    if(data) {

      const file: File = data[0];

      if(!file.type.includes('image/jpeg')) {
        return this.formData.emit({
          message: 'Niewłaściwy format pliku. Spróbuj ponownie', 
          data: undefined
        });
      }

      if(Math.round(file.size / 1024) > 5000) {
        return this.formData.emit({
          message: 'Plik jest zbyt duży.', 
          data: undefined
        });
      }

      const formData = new FormData();

      formData.append("paragon", file.name);
      console.log(formData)
      return this.formData.emit({
        message: '',
        data: formData
      });
    }

    return this.formData.emit({
      message: 'Wystąpił błąd odczytu pliku.',
      data: undefined
    });
  }

  ngOnInit() {
  }
}
