import { TestBed } from '@angular/core/testing';

import { YuriUiService } from './yuri-ui.service';

describe('YuriUiService', () => {
  let service: YuriUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YuriUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
