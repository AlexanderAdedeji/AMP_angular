import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDetatilsComponent } from './agent-detatils.component';

describe('AgentDetatilsComponent', () => {
  let component: AgentDetatilsComponent;
  let fixture: ComponentFixture<AgentDetatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentDetatilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentDetatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
