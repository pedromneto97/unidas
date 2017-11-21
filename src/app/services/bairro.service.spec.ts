import { TestBed, inject } from '@angular/core/testing';

import { BairroService } from './bairro.service';

describe('BairroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BairroService]
    });
  });

  it('should be created', inject([BairroService], (service: BairroService) => {
    expect(service).toBeTruthy();
  }));
});
