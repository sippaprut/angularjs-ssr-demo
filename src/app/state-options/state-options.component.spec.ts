import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateOptionsComponent } from './state-options.component';

describe('StateOptionsComponent', () => {
  let component: StateOptionsComponent;
  let fixture: ComponentFixture<StateOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
