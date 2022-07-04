import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsUsuariosComponent } from './actions-usuarios.component';

describe('ActionsUsuariosComponent', () => {
  let component: ActionsUsuariosComponent;
  let fixture: ComponentFixture<ActionsUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
