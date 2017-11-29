import {inject, TestBed} from '@angular/core/testing';
import {ImovelResolver} from "./imovel.resolver";

describe('ImovelResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImovelResolver]
    });
  });

  it('should ...', inject([ImovelResolver], (guard: ImovelResolver) => {
    expect(guard).toBeTruthy();
  }));
});
