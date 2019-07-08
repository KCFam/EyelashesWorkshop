import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffTransactionComponent } from './staff-transaction.component';

describe('StaffTransactionComponent', () => {
  let component: StaffTransactionComponent;
  let fixture: ComponentFixture<StaffTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
