import { Component, computed, Input, input, model, output } from '@angular/core';
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

  errorMsg = model<string>('');
  cErrorMsg = computed(() => this.errorMsg());

  maxSizeNumber = input<number>(5);
  maxSize = computed(() => this.maxSizeNumber() * 1024 * 1024)
  allowedTypes = input<string[]>([]);

  formData = output<FormData>();

  onFileDropped(file: File | undefined) {
    const formData = new FormData();
    if(file && this.validate(file)) {
      formData.append('file', file);
      formData.append('name', file.name);
      this.formData.emit(formData);
    }
  }

  onFileClicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const formData = new FormData();
      if(this.validate(file)) {
        formData.append('file', file);
        formData.append('name', file.name);
        this.formData.emit(formData);
      }
    }
  }

  validate(file: File | undefined): boolean {
    if (!this.allowedTypes().includes(file?.type as string)) {
      this.fileUploadForm.get('file')?.setErrors({ invalidType: true });
      this.errorMsg.set('Plik nie jest w odpowiednim formacie');
      return false;
    }

    if (file?.size as number > this.maxSize()) {
      this.fileUploadForm.get('file')?.setErrors({ fileTooLarge: true });
      this.errorMsg.set('Plik jest za duży');
      return false;
    }
    this.fileUploadForm.get('file')?.setErrors(null);
    this.errorMsg.set('');

    return true;
  }
}
