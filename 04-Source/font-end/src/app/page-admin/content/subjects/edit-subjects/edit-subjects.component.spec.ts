import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubjectsComponent } from './edit-subjects.component';

describe('EditSubjectsComponent', () => {
  let component: EditSubjectsComponent;
  let fixture: ComponentFixture<EditSubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
