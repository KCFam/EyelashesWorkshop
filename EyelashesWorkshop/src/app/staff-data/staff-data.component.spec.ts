import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDataComponent } from './staff-data.component';

describe('StaffDataComponent', () => {
  let component: StaffDataComponent;
  let fixture: ComponentFixture<StaffDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
