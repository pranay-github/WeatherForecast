import { of } from 'rxjs';
import { CITIES_DATA, CITY_INFORMATION } from '@app/mock/mock';
import { ForecastService } from './forecast.service';

describe('ForecastService', () => {
  let service: ForecastService;
  let http;

  beforeEach(() => {
    http = {
      get: jasmine.createSpy('get')
    };
    service = new ForecastService(http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get cities details', () => {
    http.get.and.returnValue(of(CITIES_DATA));
    service.getCitiesInformation('London').subscribe((response) => {
      expect(response).not.toBeNull();
    });
    expect(http.get).toHaveBeenCalled();
    expect(http.get).toHaveBeenCalledWith('http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=3d8b309701a13f65b660fa2c64cdc517')
  });

  it('should get temperature and sea level details', () => {
    http.get.and.returnValue(of(CITY_INFORMATION));
    service.getTemperatureSeaLevel('London').subscribe((response) => {
      expect(response).not.toBeNull();
    });
    expect(http.get).toHaveBeenCalled();
    expect(http.get).toHaveBeenCalledWith('http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&appid=3d8b309701a13f65b660fa2c64cdc517')
  });
});
