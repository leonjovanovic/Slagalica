import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulateAccComponent } from './regulate-acc.component';

describe('RegulateAccComponent', () => {
  let component: RegulateAccComponent;
  let fixture: ComponentFixture<RegulateAccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegulateAccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulateAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
