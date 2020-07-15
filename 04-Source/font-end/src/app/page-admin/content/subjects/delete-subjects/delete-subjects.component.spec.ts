import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubjectsComponent } from './delete-subjects.component';

describe('DeleteSubjectsComponent', () => {
  let component: DeleteSubjectsComponent;
  let fixture: ComponentFixture<DeleteSubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
