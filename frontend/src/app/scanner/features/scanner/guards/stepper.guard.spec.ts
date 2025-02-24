import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { stepperGuard } from './stepper.guard';

describe('stepperGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => stepperGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
