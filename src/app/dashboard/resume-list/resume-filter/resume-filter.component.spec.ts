import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeFilterComponent } from './resume-filter.component';

describe('ResumeFilterComponent', () => {
  let component: ResumeFilterComponent;
  let fixture: ComponentFixture<ResumeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
