import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiresExcelComponent } from './tires-excel.component';

describe('TiresExcelComponent', () => {
  let component: TiresExcelComponent;
  let fixture: ComponentFixture<TiresExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiresExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiresExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
