import { TestBed } from '@angular/core/testing';

import { EmpaddeditserviceService } from './empaddeditservice.service';

describe('EmpaddeditserviceService', () => {
  let service: EmpaddeditserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpaddeditserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
