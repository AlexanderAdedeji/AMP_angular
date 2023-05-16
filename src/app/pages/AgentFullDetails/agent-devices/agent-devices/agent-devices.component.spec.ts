import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDevicesComponent } from './agent-devices.component';

describe('AgentDevicesComponent', () => {
  let component: AgentDevicesComponent;
  let fixture: ComponentFixture<AgentDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
