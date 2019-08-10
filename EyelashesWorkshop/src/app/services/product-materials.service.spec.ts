import { TestBed } from '@angular/core/testing';

import { ProductMaterialsService } from './product-materials.service';

describe('ProductMaterialsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductMaterialsService = TestBed.get(ProductMaterialsService);
    expect(service).toBeTruthy();
  });
});
