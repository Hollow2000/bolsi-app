import { TestBed } from '@angular/core/testing';

import { InitialConfigurationService } from './initial-configuration.service';

describe('InitialConfigurationService', () => {
  let service: InitialConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
