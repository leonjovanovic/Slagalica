import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulateGamesComponent } from './regulate-games.component';

describe('RegulateGamesComponent', () => {
  let component: RegulateGamesComponent;
  let fixture: ComponentFixture<RegulateGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegulateGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulateGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
