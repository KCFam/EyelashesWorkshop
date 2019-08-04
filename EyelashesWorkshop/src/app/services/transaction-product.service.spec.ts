import { TestBed } from '@angular/core/testing';

import { TransactionProductService } from './transaction-product.service';

describe('TransactionProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionProductService = TestBed.get(TransactionProductService);
    expect(service).toBeTruthy();
  });
});
