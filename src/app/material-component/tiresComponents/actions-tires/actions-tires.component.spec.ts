import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsTiresComponent } from './actions-tires.component';

describe('ActionsTiresComponent', () => {
  let component: ActionsTiresComponent;
  let fixture: ComponentFixture<ActionsTiresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsTiresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsTiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
