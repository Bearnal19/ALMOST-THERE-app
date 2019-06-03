import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAlarmComponent } from './item-alarm.component';

describe('ItemAlarmComponent', () => {
  let component: ItemAlarmComponent;
  let fixture: ComponentFixture<ItemAlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemAlarmComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
