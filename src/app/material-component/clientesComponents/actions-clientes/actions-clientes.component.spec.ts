import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsClientesComponent } from './actions-clientes.component';

describe('ActionsClientesComponent', () => {
  let component: ActionsClientesComponent;
  let fixture: ComponentFixture<ActionsClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
