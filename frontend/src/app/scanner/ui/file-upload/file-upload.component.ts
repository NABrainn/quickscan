import { Component, computed, Input, input, model, OnInit, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card'; 
import { DragDropDirective } from './directives/drag-drop.directive';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'; 

@Component({
  selector: 'app-file-upload',
  imports: [
    MatCardModule,
    DragDropDirective,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  @Input() formGroup?: FormGroup;

  get fileUploadForm(): FormGroup {
    return this.formGroup!;
  }

  errorMsg = signal<string>('');
  cErrorMsg = computed(() => this.errorMsg());

  onFileDropped(file: File | undefined) {
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; 

    if (!allowedTypes.includes(file?.type as string)) {
      this.fileUploadForm.get('file')?.setErrors({ invalidType: true });
      this.errorMsg.set('Plik nie jest w odpowiednim formacie');
      return;
    }

    if (file?.size as number > maxSize) {
      this.fileUploadForm.get('file')?.setErrors({ fileTooLarge: true });
      this.errorMsg.set('Plik jest za duży');
      return;
    }

    this.fileUploadForm.get('file')?.setErrors(null);
  }

  onFileClicked(event: Event) {
    const input = event.target as HTMLInputElement

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; 

      if (!allowedTypes.includes(file?.type as string)) {
        this.fileUploadForm.get('file')?.setErrors({ invalidType: true });
        this.errorMsg.set('Plik nie jest w odpowiednim formacie');
        return;
      }

      if (file?.size as number > maxSize) {
        this.fileUploadForm.get('file')?.setErrors({ fileTooLarge: true });
        this.errorMsg.set('Plik jest za duży');
        return;
      }
      this.fileUploadForm.get('file')?.setErrors(null);
      this.errorMsg.set('');
    }
  }
}
