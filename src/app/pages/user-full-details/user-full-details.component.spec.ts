import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFullDetailsComponent } from './user-full-details.component';

describe('UserFullDetailsComponent', () => {
  let component: UserFullDetailsComponent;
  let fixture: ComponentFixture<UserFullDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFullDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
