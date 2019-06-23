import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfigPage } from './modal-config.page';

describe('ModalConfigPage', () => {
  let component: ModalConfigPage;
  let fixture: ComponentFixture<ModalConfigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConfigPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
