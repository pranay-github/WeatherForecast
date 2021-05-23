import { of } from 'rxjs';
import { CityPageComponent } from './city-page.component';

describe('CityPageComponent', () => {
  let component: CityPageComponent;
  let service;
  let activatedRoute;
  let changeDetectorRef;

  beforeEach(() => {
    service = {
      getTemperatureSeaLevel: jasmine.createSpy('getTemperatureSeaLevel').and.returnValue(of([
        {isActive: false}
      ] as any))
    };
    activatedRoute = {
      snapshot: {
        params: {
          name: 'London'
        }
      }
    };
    changeDetectorRef = {
      markForCheck: jasmine.createSpy('markForCheck')
    };
    component = new CityPageComponent(service, activatedRoute, changeDetectorRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data in ngOnInit', () => {
    component.ngOnInit();
    expect(component.cityDetails).not.toBeNull();
    expect(component.activeContent).not.toBeNull();
    expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
  });

  it('should set active content', () => {
    component.cityDetails = [{temperature: '4'}, {temperature: '5'}] as any;
    component.setActive(0);
    expect(component.activeContent.isActive).toBe(true);
  });
});
