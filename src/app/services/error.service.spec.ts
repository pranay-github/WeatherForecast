import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should showError', () => {
    service['subject'] = {
      next: jasmine.createSpy('next')
    } as any;
    service.showError('message');
    expect(service['subject'].next).toHaveBeenCalled();
  });
});
