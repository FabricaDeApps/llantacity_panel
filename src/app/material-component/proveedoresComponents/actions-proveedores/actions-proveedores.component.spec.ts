import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsProveedoresComponent } from './actions-proveedores.component';

describe('ActionsProveedoresComponent', () => {
  let component: ActionsProveedoresComponent;
  let fixture: ComponentFixture<ActionsProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
