import { TestBed } from '@angular/core/testing';

import { MapDistanceService } from './map-distance.service';

describe('MapDistanceService', () => {
  let service: MapDistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapDistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
