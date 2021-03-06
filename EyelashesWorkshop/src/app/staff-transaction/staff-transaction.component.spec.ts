import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionProductComponent } from './staff-transaction.component';

describe('TransactionProductComponent', () => {
  let component: TransactionProductComponent;
  let fixture: ComponentFixture<TransactionProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
