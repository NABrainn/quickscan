import { Component, computed, inject, input, OnInit, signal, TemplateRef, viewChild } from '@angular/core';
import {MatStepper, MatStepperModule} from '@angular/material/stepper'; 
import {MatButtonModule} from '@angular/material/button';
import { FileUploadComponent } from 'app/scanner/ui/file-upload/file-upload.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScannerService } from './service/scanner.service';
import { DocumentCardComponent } from 'app/scanner/ui/document-card/document-card.component';
import { Invoice, Receipt } from 'app/scanner/shared/types';

@Component({
  selector: 'app-scanner',
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    FileUploadComponent,
    DocumentCardComponent,
  ],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent{

  fb = inject(FormBuilder);
  service = inject(ScannerService);

  _stepErrorMsg = signal<string>('');
  stepErrorMsg = computed(() => this._stepErrorMsg());
  document = signal<Invoice | Receipt>({});
  cDocument = computed(() => this.document())
  stepper = viewChild(MatStepper);
  
  fileUploadForm = this.fb.group({
    file: ['', Validators.required]
  })

  uploadFile(formData: FormData) {
    this.service.uploadFile(formData).subscribe({
      next: (res: Invoice | Receipt) => {
        this.document.set(res);
        this.stepper()?.next();
        console.log(this.cDocument())
      },
      error: (res) => {
        this._stepErrorMsg.set(res?.error?.message);
        this.fileUploadForm?.reset();
      }
    });
  }
}
