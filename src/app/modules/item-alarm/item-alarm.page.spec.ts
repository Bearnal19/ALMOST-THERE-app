import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAlarmPage } from './item-alarm.page';

describe('ItemAlarmPage', () => {
  let component: ItemAlarmPage;
  let fixture: ComponentFixture<ItemAlarmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemAlarmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAlarmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
