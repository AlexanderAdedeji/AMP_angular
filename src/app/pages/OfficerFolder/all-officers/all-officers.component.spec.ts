import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOfficersComponent } from './all-officers.component';

describe('AllUsersComponent', () => {
  let component: AllOfficersComponent;
  let fixture: ComponentFixture<AllOfficersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllOfficersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
