import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYearsSemestersComponent } from './add-years-semesters.component';

describe('AddYearsSemestersComponent', () => {
  let component: AddYearsSemestersComponent;
  let fixture: ComponentFixture<AddYearsSemestersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddYearsSemestersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddYearsSemestersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
