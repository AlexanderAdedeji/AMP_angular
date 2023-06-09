import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDevicesComponent } from './all-devices.component';

describe('AllAgentsComponent', () => {
  let component:  AllDevicesComponent;
  let fixture: ComponentFixture< AllDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent( AllDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
