import { TestBed, inject } from '@angular/core/testing';

import { OnlineExamService } from './online-exam.service';

describe('OnlineExamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlineExamService]
    });
  });

  it('should be created', inject([OnlineExamService], (service: OnlineExamService) => {
    expect(service).toBeTruthy();
  }));
});
