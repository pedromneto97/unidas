import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarimovelComponent } from './editarimovel.component';

describe('EditarimovelComponent', () => {
  let component: EditarimovelComponent;
  let fixture: ComponentFixture<EditarimovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarimovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarimovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
