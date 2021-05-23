import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { CustomInterceptorService } from './custom-interceptor.service';

describe('CustomInterceptorService', () => {
  let service: CustomInterceptorService;
  let errorService;

  beforeEach(() => {
    errorService = {
      showError: jasmine.createSpy('showError')
    };
    service = new CustomInterceptorService(errorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should intercept request with success', () => {
    const req = {} as any;
    const next = {
      handle: jasmine.createSpy('handle').and.returnValue(of({}))
    };
    service.intercept(req, next);
    expect(errorService.showError).not.toHaveBeenCalled();
  });
  it('should intercept request with failure', () => {
    const req = {} as any;
    const next = {
      handle: jasmine.createSpy('handle').and.returnValue(throwError({}))
    };
    service.intercept(req, next).subscribe(() => {}, () => {
      expect(errorService.showError).toHaveBeenCalled();
    });
  });
});
