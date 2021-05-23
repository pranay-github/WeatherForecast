import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let errorService;
  beforeEach(() => {
    errorService = {
      error: {
        subscribe: jasmine.createSpy('subscribe').and.returnValue(of())
      }
    };
    component = new AppComponent(errorService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  describe('#ngOnInit', () => {
    it('should handle success', () => {
      component.ngOnInit();
      expect(component.showError).toBe(false);
    });
    it('should handle failure', () => {
      errorService.error.subscribe.and.callFake(a => a('message'));
      component.ngOnInit();
      expect(component.showError).toBe(true);
    });
    it('should handle failure', () => {
      errorService.error.subscribe.and.callFake(a => a());
      component.ngOnInit();
      expect(component.showError).toBe(false);
    });
  });
});
