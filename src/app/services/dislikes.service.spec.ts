import { TestBed } from '@angular/core/testing';

import { DislikesService } from './dislikes.service';

describe('DislikesService', () => {
  let service: DislikesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DislikesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
