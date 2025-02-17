import { Component, computed, inject, input, OnInit, signal, TemplateRef, viewChild } from '@angular/core';
import {MatStepper, MatStepperModule} from '@angular/material/stepper'; 
import {MatButtonModule} from '@angular/material/button';
import { FileUploadComponent } from 'app/scanner/ui/file-upload/file-upload.component';
import { ListComponent } from 'app/scanner/ui/list/list.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScannerService } from './service/scanner.service';

@Component({
  selector: 'app-scanner',
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    FileUploadComponent,
    ListComponent,
  ],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent{

  fb = inject(FormBuilder);
  service = inject(ScannerService);

  _stepErrorMsg = signal<string>('');
  stepErrorMsg = computed(() => this._stepErrorMsg());
  document = signal<Object>({});
  stepper = viewChild(MatStepper);
  
  fileUploadForm = this.fb.group({
    file: ['', Validators.required]
  })

  uploadFile(formData: FormData) {
    console.log('xd');
    this.service.uploadFile(formData).subscribe({
      next: (res) => {
        this.document.set(res);
        this.stepper()?.next();
      },
      error: (res) => this._stepErrorMsg.set(res?.message)
    });
  }
}
