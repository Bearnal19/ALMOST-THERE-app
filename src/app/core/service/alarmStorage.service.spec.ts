import { TestBed } from '@angular/core/testing';

import { AlarmStorageService } from './alarmStorage.service';

describe('AlarmStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlarmStorageService = TestBed.get(AlarmStorageService);
    expect(service).toBeTruthy();
  });
});
