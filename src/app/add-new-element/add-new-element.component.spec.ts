import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewElementComponent } from './add-new-element.component';

describe('AddNewElementComponent', () => {
  let component: AddNewElementComponent;
  let fixture: ComponentFixture<AddNewElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
