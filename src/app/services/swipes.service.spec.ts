import { TestBed } from '@angular/core/testing';

import { SwipesService } from './swipes.service';

describe('SwipesService', () => {
  let service: SwipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
