import { TestBed, inject } from '@angular/core/testing';

import { RuaService } from './rua.service';

describe('RuaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RuaService]
    });
  });

  it('should be created', inject([RuaService], (service: RuaService) => {
    expect(service).toBeTruthy();
  }));
});
