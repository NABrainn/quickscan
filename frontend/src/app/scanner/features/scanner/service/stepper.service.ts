import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepperService {
  documentUploadValid = signal<boolean>(false);
  fileUploadValid = signal<boolean>(false);
}
