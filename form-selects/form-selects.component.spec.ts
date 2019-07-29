import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSelectsComponent } from './form-selects.component';

describe('FormSelectsComponent', () => {
  let component: FormSelectsComponent;
  let fixture: ComponentFixture<FormSelectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSelectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSelectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
