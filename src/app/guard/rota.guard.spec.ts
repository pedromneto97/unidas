import { TestBed, async, inject } from '@angular/core/testing';

import { RotaGuard } from './rota.guard';

describe('RotaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RotaGuard]
    });
  });

  it('should ...', inject([RotaGuard], (guard: RotaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
