import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGeographyComponent } from './create-geography.component';

describe('CreateGeographyComponent', () => {
  let component: CreateGeographyComponent;
  let fixture: ComponentFixture<CreateGeographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGeographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGeographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
