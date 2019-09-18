import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnagramComponent } from './create-anagram.component';

describe('CreateAnagramComponent', () => {
  let component: CreateAnagramComponent;
  let fixture: ComponentFixture<CreateAnagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAnagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAnagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
