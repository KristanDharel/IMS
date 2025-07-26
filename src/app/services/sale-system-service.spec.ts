import { TestBed } from '@angular/core/testing';

import { SaleSystemService } from './sale-system-service';

describe('SaleSystemService', () => {
  let service: SaleSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
