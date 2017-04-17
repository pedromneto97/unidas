import {inject, TestBed} from "@angular/core/testing";

import {ImoveisService} from "./imoveis.service";

describe('ImoveisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImoveisService]
    });
  });

  it('should ...', inject([ImoveisService], (service: ImoveisService) => {
    expect(service).toBeTruthy();
  }));
});
