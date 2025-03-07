import { TestBed } from '@angular/core/testing';

import { StepperGuardService } from './stepper.service';

describe('StepperService', () => {
  let service: StepperGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepperGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
