import { TestBed } from '@angular/core/testing';

import { EmployedetailsService } from './employedetails.service';

describe('EmployedetailsService', () => {
  let service: EmployedetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployedetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
