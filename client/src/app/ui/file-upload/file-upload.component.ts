import { Component, inject, output, signal } from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card'; 
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatIcon} from '@angular/material/icon'; 
import { DragDropDirective } from './directives/drag-drop.directive';
import { fileSizeValidator, fileTypeValidator } from '@shared/form/validators/file-validators';

@Component({
  selector: 'app-file-upload',
  imports: [
    MatCard,
    MatCardContent,
    DragDropDirective,
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  #fb = inject(FormBuilder);
  fileUpload = output<FormData>();

  fileForm = this.#fb.nonNullable.control<File | undefined>(undefined, [
      Validators.required, 
      fileSizeValidator(5),
      fileTypeValidator(['image/jpeg', 'image/png'])
  ]);

  message = signal<string>('');

  onFileDropped(file: File | undefined) {
    this.fileForm.setValue(file);
    if(this.fileForm.valid) {
      this.#emitFormData(this.fileForm.value!);
      this.message.set('');
      return
    }
    this.message.set(
      this.fileForm.errors?.['invalidFileType'] || 
      this.fileForm.errors?.['fileTooLarge'] ||
      this.fileForm.errors?.['required'] ||
      'Nieznany błąd');
  }

  onFileClicked(event: Event) {
    const input = event.target as HTMLInputElement
    const file: File = input.files![0];
    this.fileForm.setValue(file);
    input.value = '';
    if(this.fileForm.valid) {
      this.#emitFormData(this.fileForm.value!);
      this.message.set('');
      return
    }
    this.message.set(
      this.fileForm.errors?.['invalidFileType'] || 
      this.fileForm.errors?.['fileTooLarge'] ||
      this.fileForm.errors?.['required'] ||
      'Nieznany błąd');
  }

  #emitFormData(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('name', file.name);
    this.fileUpload.emit(fd);
  }
}
