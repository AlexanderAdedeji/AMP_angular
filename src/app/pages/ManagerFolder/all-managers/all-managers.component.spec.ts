import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllManagersComponent } from './all-managers.component';

describe('AllManagersComponent', () => {
  let component: AllManagersComponent;
  let fixture: ComponentFixture<AllManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllManagersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
