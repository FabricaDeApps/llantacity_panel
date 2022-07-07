import { TestBed } from '@angular/core/testing';

import { TiresService } from './tires.service';

describe('TiresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiresService = TestBed.get(TiresService);
    expect(service).toBeTruthy();
  });
});
