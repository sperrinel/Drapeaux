import { TestBed } from '@angular/core/testing';

import { DrapeauxService } from './drapeaux.service';

describe('DrapeauxService', () => {
  let service: DrapeauxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrapeauxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
