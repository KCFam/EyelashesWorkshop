import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDashboardComponent } from './transaction-dashboard.component';

describe('TransactionDashboardComponent', () => {
  let component: TransactionDashboardComponent;
  let fixture: ComponentFixture<TransactionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
