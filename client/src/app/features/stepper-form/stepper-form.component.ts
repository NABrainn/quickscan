import { Component, computed, inject, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatStep, MatStepContent, MatStepLabel, MatStepper, MatStepperModule} from '@angular/material/stepper';
import { fileSizeValidator, fileTypeValidator } from '@shared/form/validators/file-validators';
import { BillingDocument } from '@shared/services/document/document.service';
import { isInvoice } from '@shared/services/type-guards';
import { TestObjects } from '@shared/test-objects';
import { DocumentForm } from '@ui/document-form/document-form.component';
import { DocumentMenuComponent } from '@ui/document-menu/document-menu.component';
import { FileUploadComponent } from '@ui/file-upload/file-upload.component';
import { ReadyCardComponent } from '@ui/ready-card/ready-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stepper-form',
  imports: [
    MatStepperModule,
    FileUploadComponent,
    DocumentMenuComponent,
    ReadyCardComponent
  ],
  templateUrl: './stepper-form.component.html'
})
export class StepperFormComponent {

  #fb = inject(FormBuilder);
  stepper = viewChild(MatStepper);

  #document = signal<BillingDocument | undefined>(undefined);
  document = computed(() => this.#document());

  fileUploadControl = this.#fb.nonNullable.control<FormData | undefined>(undefined, [
    Validators.required,
  ]);
  documentFormControl = this.#fb.nonNullable.control<BillingDocument | undefined>(undefined, [
    Validators.required,
  ]);

  onFileUpload(formData: FormData) {    
    this.#document.set(TestObjects.helperInvoice());
    this.fileUploadControl.setValue(formData);
    this.stepper()?.next();
  }

  onSaveDocument(document: BillingDocument | undefined) {
    this.documentFormControl.setValue(document);
    this.stepper()?.next();
  }
}
