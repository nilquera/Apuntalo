import { TestBed } from '@angular/core/testing';

import { UnidetailService } from './unidetail.service';

describe('UnidetailService', () => {
  let service: UnidetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
