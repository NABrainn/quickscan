import { Component, computed, inject, signal, viewChild } from '@angular/core';
import {MatStep, MatStepContent, MatStepLabel, MatStepper} from '@angular/material/stepper'; 
import { FileUploadComponent } from 'app/ui/file-upload/file-upload.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScannerService } from './service/scanner.service';
import { Invoice, Receipt } from 'app/shared/types';
import { ReadyCardComponent } from 'app/ui/ready-card/ready-card.component';
import { Router } from '@angular/router';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { StepperGuardService } from './service/stepper.service';
import { DocumentMenuComponent } from 'app/ui/document-menu/document-menu.component';

@Component({
  selector: 'app-scanner',
  imports: [
    ReactiveFormsModule,
    MatStep,
    MatStepper,
    MatStepContent,
    MatStepLabel,
    FileUploadComponent,
    ReadyCardComponent,
    DocumentMenuComponent
  ],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent{

  readonly scannerService = inject(ScannerService);
  readonly stepperService = inject(StepperGuardService);

  readonly fb = inject(FormBuilder);
  readonly router = inject(Router);

  readonly _stepErrorMsg = signal<string>('');
  readonly stepErrorMsg = computed(() => this._stepErrorMsg());

  private readonly _document = signal<Invoice | Receipt>({} as Invoice);
  readonly document = computed(() => this._document());

  private readonly _isToggledDetails = signal<boolean>(false);
  readonly isToggledDetails = computed(() => this._isToggledDetails());

  private _savedFormData = signal<FormData>(new FormData());
  readonly savedFormData = computed(() => this._savedFormData());

  readonly stepper = viewChild(MatStepper);
  
  fileUploadForm = this.fb.group({
    file: ['', Validators.required]
  })

  documentUploadForm = this.fb.group({
    document: [null as (Invoice | Receipt) | null, Validators.required]
  })

  uploadFile(formData: FormData) {
    this._isToggledDetails.set(false); 
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
      error: (res) => {
        this._stepErrorMsg.set(res?.error?.message);
      }
    });
  }

  saveDocument(document: Invoice | Receipt) {
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

  onToggledDetailsChange(value: boolean) {
    this._isToggledDetails.set(value);
  }

  onStepperSelectionChange(value: StepperSelectionEvent) {
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

  onRequestNavigate(value: any) {
    this.router.navigate([value.uri]);
    if(value.reset)
      this.stepper()?.reset();
  }
}
