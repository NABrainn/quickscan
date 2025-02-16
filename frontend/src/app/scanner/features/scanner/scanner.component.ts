import { Component, inject, OnInit } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper'; 
import {MatButtonModule} from '@angular/material/button';
import { FileUploadComponent } from 'app/scanner/ui/file-upload/file-upload.component';
import { ListComponent } from 'app/scanner/ui/list/list.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
export class ScannerComponent implements OnInit {

  fb = inject(FormBuilder);

  
  fileUploadForm = this.fb.group({
    file: ['', Validators.required]
  })

  ngOnInit(): void {
    console.log(this.fileUploadForm.status)
  }
}
