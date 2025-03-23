import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepperGuardService {
  documentUploadValid = signal<boolean>(false);
  fileUploadValid = signal<boolean>(false);
}
