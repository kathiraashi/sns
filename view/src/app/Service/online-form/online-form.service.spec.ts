import { TestBed, inject } from '@angular/core/testing';

import { OnlineFormService } from './online-form.service';

describe('OnlineFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlineFormService]
    });
  });

  it('should be created', inject([OnlineFormService], (service: OnlineFormService) => {
    expect(service).toBeTruthy();
  }));
});
