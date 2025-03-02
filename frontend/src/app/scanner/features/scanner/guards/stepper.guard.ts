import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StepperGuardService } from '../service/stepper.service';

export const stepperGuard: CanActivateFn = (route, state) => {
  const stepper = inject(StepperGuardService);
  const router = inject(Router);
  
  switch(state.url) {
    case '/skaner/przeslij':
      if(stepper.fileUploadValid())
        return true;
      router.navigate(['/skaner/skanuj']);
      break;
    case '/skaner/gotowe':
      if(stepper.documentUploadValid())
        return true;
      router.navigate(['/skaner/skanuj']);
      break;
  }
  return true;
};
