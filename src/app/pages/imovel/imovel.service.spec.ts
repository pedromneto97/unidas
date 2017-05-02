import { TestBed, inject } from '@angular/core/testing';

import { ImovelService } from './imovel.service';

describe('ImovelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImovelService]
    });
  });

  it('should ...', inject([ImovelService], (service: ImovelService) => {
    expect(service).toBeTruthy();
  }));
});
