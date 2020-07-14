import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteYearsSemestersComponent } from './delete-years-semesters.component';

describe('DeleteYearsSemestersComponent', () => {
  let component: DeleteYearsSemestersComponent;
  let fixture: ComponentFixture<DeleteYearsSemestersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteYearsSemestersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteYearsSemestersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
