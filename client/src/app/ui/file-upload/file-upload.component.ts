import { Component, computed, Input, input, model, output } from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card'; 
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatIcon} from '@angular/material/icon'; 
import { DragDropDirective } from './directives/drag-drop.directive';

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

  fileForm = input.required<FormControl<File | undefined>>()
  message = model<string>('');

  onFileDropped(file: File | undefined) {
    this.fileForm().setValue(file);
  }

  onFileClicked(event: Event) {
    const input = event.target as HTMLInputElement
    const file: File = input.files![0];
    this.fileForm().setValue(file);
    input.value = '';
  }
}
