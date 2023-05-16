import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeAssignUserComponent } from './deAssign-user.component';

describe('DeAssignUserComponent', () => {
  let component: DeAssignUserComponent;
  let fixture: ComponentFixture<DeAssignUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeAssignUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeAssignUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
