import { Component, computed, inject, signal, viewChild } from '@angular/core';
import {MatStepper, MatStepperModule} from '@angular/material/stepper'; 
import {MatButtonModule} from '@angular/material/button';
import { FileUploadComponent } from 'app/scanner/ui/file-upload/file-upload.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScannerService } from './service/scanner.service';
import { DocumentCardComponent } from 'app/scanner/ui/document-card/document-card.component';
import { Invoice, Receipt } from 'app/scanner/shared/types';
import { ReadyCardComponent } from 'app/scanner/ui/ready-card/ready-card.component';
import { Router } from '@angular/router';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-scanner',
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    FileUploadComponent,
    DocumentCardComponent,
    ReadyCardComponent,
  ],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent{

  fb = inject(FormBuilder);
  service = inject(ScannerService);
  router = inject(Router);

  _stepErrorMsg = signal<string>('');
  stepErrorMsg = computed(() => this._stepErrorMsg());

  private readonly _document = signal<Invoice | Receipt>({} as Invoice);
  document = computed(() => this._document());

  private _savedFormData = signal<FormData>(new FormData());
  savedFormData = computed(() => this._savedFormData());

  stepper = viewChild(MatStepper);
  
  fileUploadForm = this.fb.group({
    file: ['', Validators.required]
  })

  uploadFile(formData: FormData) {
    this._savedFormData.set(formData);
    this.service.uploadFile(formData).subscribe({
      next: (res: Invoice | Receipt) => {
        this._document.set(res);
        this.stepper()?.next();
      },
      error: (res) => {
        this._stepErrorMsg.set(res?.error?.message);
        this.fileUploadForm?.reset();
      }
    });
  }

  regenerateDocument() {
    this.service.uploadFile(this.savedFormData()).subscribe({
      next: (res: Invoice | Receipt) => {
        this._document.set(res);
      },
    });
  }

  saveDocument() {
    this.service.saveDocument(this.document()).subscribe({
      next: (res: Invoice | Receipt) => {
        this.stepper()?.next();
      },
      error: (res) => console.log(res)
    });
  }

  navigate(value: StepperSelectionEvent) {
    switch(value.selectedIndex) {
      case 0:
        this.router.navigate(['skaner/skanuj']);
        break;
      case 1:
        this.router.navigate(['skaner/przeslij']);
        break;
      case 2:
        this.router.navigate(['skaner/gotowe']);
        break;
      default:
        this.router.navigate(['skaner/skanuj']);
    }
  }

  handleNavigate(value: string) {
    this.router.navigate([value]);
    this.stepper()?.reset();
  }
}
