import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { initialConfigurationGuard } from './initial-configuration.guard';

describe('initialConfigurationGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => initialConfigurationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
