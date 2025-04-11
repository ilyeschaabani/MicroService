import { TestBed } from '@angular/core/testing';

import { AccompagnementService } from './accompagnement.service';

describe('AccompagnementService', () => {
  let service: AccompagnementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccompagnementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
