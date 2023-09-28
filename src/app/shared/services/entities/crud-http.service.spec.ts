import { TestBed } from '@angular/core/testing';

import { CrudHttpService } from './based-crud-http.service';

describe('CrudHttpService', () => {
  let service: CrudHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
