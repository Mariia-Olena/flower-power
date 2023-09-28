import { TestBed } from '@angular/core/testing';

import { EditResolver } from './add-edit/components/product-add-edit/product-edit.resolver';

describe('EditResolver', () => {
  let resolver: EditResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EditResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
