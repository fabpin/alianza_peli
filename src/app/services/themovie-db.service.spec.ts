import { TestBed } from '@angular/core/testing';

import { ThemovieDBService } from './themovie-db.service';

describe('ThemovieDBService', () => {
  let service: ThemovieDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemovieDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
