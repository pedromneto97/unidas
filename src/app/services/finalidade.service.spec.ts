import { TestBed, inject } from '@angular/core/testing';

import { FinalidadeService } from './finalidade.service';

describe('FinalidadeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinalidadeService]
    });
  });

  it('should be created', inject([FinalidadeService], (service: FinalidadeService) => {
    expect(service).toBeTruthy();
  }));
});
