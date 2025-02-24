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
import { StepperService } from './service/stepper.service';

@Component({
  selector: 'app-scanner',
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    FileUploadComponent,
    DocumentCardComponent,
    ReadyCardComponent
  ],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent{

  scannerService = inject(ScannerService);
  stepperService = inject(StepperService);

  fb = inject(FormBuilder);
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
    this.scannerService.uploadFile(formData).subscribe({
      next: (res: Invoice | Receipt) => {
        this._stepErrorMsg.set('');
        this._document.set(res);
        this.stepperService.fileUploadValid.set(true);
        this.stepper()?.next();
      },
      error: (res) => {
        this._stepErrorMsg.set(res?.error?.message);
        this.stepperService.fileUploadValid.set(false);
        this.fileUploadForm?.reset();
      }
    });
  }

  regenerateDocument() {
    this.scannerService.uploadFile(this.savedFormData()).subscribe({
      next: (res: Invoice | Receipt) => {
        this._document.set(res);
      },
    });
  }

  saveDocument(document: Invoice | Receipt) {
    console.log(document)
    this.scannerService.saveDocument(document).subscribe({
      next: (res: Invoice | Receipt) => {
        this.documentUploadForm.controls.document.setValue(document);
        this.stepperService.documentUploadValid.set(true);
        this.stepper()?.next();
      },
      error: (res) =>  {
        this.stepperService.documentUploadValid.set(false);
        this._stepErrorMsg.set(res?.error?.message);
      }
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
