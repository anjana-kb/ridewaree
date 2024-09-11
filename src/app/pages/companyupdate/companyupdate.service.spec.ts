import { TestBed } from '@angular/core/testing';

import { CompanyupdateService } from './companyupdate.service';

describe('CompanyupdateService', () => {
  let service: CompanyupdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyupdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
