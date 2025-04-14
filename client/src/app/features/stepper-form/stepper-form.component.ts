import { Component, inject, OnDestroy, OnInit, viewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {MatStep, MatStepContent, MatStepLabel, MatStepper, MatStepperModule} from '@angular/material/stepper';
import { fileTypeValidator } from '@shared/form/validators/file-validators';
import { FileUploadComponent } from '@ui/file-upload/file-upload.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-stepper-form',
  imports: [
    MatStepperModule,
    FileUploadComponent,
  ],
  templateUrl: './stepper-form.component.html'
})
export class StepperFormComponent implements OnInit, OnDestroy {

  #fileUploadValidSubscription!: Subscription;

  #fb = inject(FormBuilder);
  stepper = viewChild(MatStepper);

  fileForm = this.#fb.nonNullable.control<File | undefined>(undefined, [
    Validators.required, 
    Validators.maxLength(5 * 1024 * 1024), 
    fileTypeValidator(['image/jpeg', 'image/png'])
  ]);
  documentForm = this.#fb.nonNullable.control('', Validators.required);

  onFileUploadChange() {   
    if(this.stepper())
      this.stepper()!.next()    
  }

  ngOnInit() {
    this.#fileUploadValidSubscription = this.fileForm.statusChanges.subscribe(
      (value) => {
        if(value === 'VALID') {
          this.stepper()!.next();
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.#fileUploadValidSubscription.unsubscribe();
  }
}
