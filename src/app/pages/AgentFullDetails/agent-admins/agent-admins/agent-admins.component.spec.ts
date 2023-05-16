import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAdminsComponent } from './agent-admins.component';

describe('AgentAdminsComponent', () => {
  let component: AgentAdminsComponent;
  let fixture: ComponentFixture<AgentAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentAdminsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
