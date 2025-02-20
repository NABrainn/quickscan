import { Component, computed, inject, signal, viewChild } from '@angular/core';
import {MatStepper, MatStepperModule} from '@angular/material/stepper'; 
import {MatButtonModule} from '@angular/material/button';
import { FileUploadComponent } from 'app/scanner/ui/file-upload/file-upload.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScannerService } from './service/scanner.service';
import { DocumentCardComponent } from 'app/scanner/ui/document-card/document-card.component';
import { Invoice, Receipt } from 'app/scanner/shared/types';
import { ReadyCardComponent } from 'app/scanner/ui/ready-card/ready-card.component';
import { Router, RouterOutlet } from '@angular/router';
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
    RouterOutlet
  ],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent{

  fb = inject(FormBuilder);
  service = inject(ScannerService);
  router = inject(Router);

  readonly _stepErrorMsg = signal<string>('');
  stepErrorMsg = computed(() => this._stepErrorMsg());

  private readonly _document = signal<Invoice | Receipt>({} as Invoice);
  document = computed(() => this._document());

  private _savedFormData = signal<FormData>(new FormData());
  savedFormData = computed(() => this._savedFormData());

  stepper = viewChild(MatStepper);
  
  fileUploadForm = this.fb.group({
    file: ['', Validators.required]
  })

  documentUploadForm = this.fb.group({
    document: [null as (Invoice | Receipt) | null, Validators.required]
  })

  uploadFile(formData: FormData) {
    this._savedFormData.set(formData);
    this.service.uploadFile(formData).subscribe({
      next: (res: Invoice | Receipt) => {
        this._stepErrorMsg.set('');
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

  saveDocument(document: Invoice | Receipt) {
    console.log(document)
    this.service.saveDocument(document).subscribe({
      next: (res: Invoice | Receipt) => {
        this.documentUploadForm.controls.document.setValue(document)
        this.stepper()?.next();
      },
      error: (res) => this._stepErrorMsg.set(res?.error?.message)
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

  handleNavigate(value: any) {
    this.router.navigate([value.uri]);
    if(value.reset)
      this.stepper()?.reset();
  }
}
