import { TestBed } from '@angular/core/testing';

import { UniversitatService } from './universitat.service';

describe('UniversitatService', () => {
  let service: UniversitatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversitatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
