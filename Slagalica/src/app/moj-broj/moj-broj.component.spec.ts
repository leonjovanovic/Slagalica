import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MojBrojComponent } from './moj-broj.component';

describe('MojBrojComponent', () => {
  let component: MojBrojComponent;
  let fixture: ComponentFixture<MojBrojComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MojBrojComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MojBrojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
