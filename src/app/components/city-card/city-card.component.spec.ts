import { of } from 'rxjs';
import { CityCardComponent } from './city-card.component';

describe('CityCardComponent', () => {
  let component: CityCardComponent;
  let service;
  let router;
  let changeDetectorRef;

  beforeEach(() => {
    service = {
      getCitiesInformation: jasmine.createSpy('getCitiesInformation').and.returnValue(of([
        {temperature: '4', seaLevel: 123}
      ] as any))
    };
    router = {
      navigate: jasmine.createSpy('navigate')
    };
    changeDetectorRef = {
      markForCheck: jasmine.createSpy('markForCheck')
    };
    component = new CityCardComponent(service, changeDetectorRef, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data in ngOninit', () => {
    component.ngOnInit();
    expect(component.cityData).not.toBeNull();
    expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
  });

  it('should get image url', () => {
    component.city = 'london';
    const response = component.getImageURL();
    expect(response).toEqual('../../../assets/images/london.png')
  });

  it('should navigate on city card click', () => {
    component.city = 'london';
    component.onCardClick();
    expect(router.navigate).toHaveBeenCalledWith(['city-page', 'london']);
  });
});
