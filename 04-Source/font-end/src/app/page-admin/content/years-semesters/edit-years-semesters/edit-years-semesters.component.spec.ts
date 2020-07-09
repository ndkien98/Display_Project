import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYearsSemestersComponent } from './edit-years-semesters.component';

describe('EditYearsSemestersComponent', () => {
  let component: EditYearsSemestersComponent;
  let fixture: ComponentFixture<EditYearsSemestersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditYearsSemestersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditYearsSemestersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
