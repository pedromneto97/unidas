import { TestBed, inject } from '@angular/core/testing';

import { InteresseService } from './interesse.service';

describe('InteresseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InteresseService]
    });
  });

  it('should be created', inject([InteresseService], (service: InteresseService) => {
    expect(service).toBeTruthy();
  }));
});
