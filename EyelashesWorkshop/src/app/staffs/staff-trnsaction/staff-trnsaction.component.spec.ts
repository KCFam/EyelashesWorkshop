import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffTrnsactionComponent } from './staff-trnsaction.component';

describe('StaffTrnsactionComponent', () => {
  let component: StaffTrnsactionComponent;
  let fixture: ComponentFixture<StaffTrnsactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffTrnsactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffTrnsactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
