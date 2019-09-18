import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyResultsComponent } from './daily-results.component';

describe('DailyResultsComponent', () => {
  let component: DailyResultsComponent;
  let fixture: ComponentFixture<DailyResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
