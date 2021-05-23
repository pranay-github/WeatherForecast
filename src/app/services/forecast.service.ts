import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environment/environment';
import { ICity } from '@app/models/city';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }

  /**
   * To get all the cities information
   * @param {string} name
   * @returns {Observable<ICity>}
   */
  getCitiesInformation(name: string): Observable<ICity> {
    return this.http.get<ICity>(`${environment.baseUrl}weather?q=${name}&units=metric&appid=3d8b309701a13f65b660fa2c64cdc517`)
    .pipe(map(response => this.mapCity(response, name)));
  }

  /**
   * To get temperature sea level
   * @param {string} name
   * @returns {Observable<ICity[]>}
   */
  getTemperatureSeaLevel(name: string): Observable<ICity[]> {
    return this.http.get<ICity[]>(`${environment.baseUrl}forecast?q=${name}&units=metric&appid=3d8b309701a13f65b660fa2c64cdc517`)
    .pipe(map(response => this.mapTemperature(response)));
  }

  /**
   * To Map city information
   * @param response
   * @param name
   * @returns
   */
  private mapCity(response: any, name: string): ICity {
    const cityData: ICity = {
      name,
      temperature: `Temperature ${Math.floor(response.main.temp)}°C`,
      seaLevel: `${response.main.sea_level} hPa`,
      sunRiseTime: `Sun Rise Time ${this.getTime(response.sys.sunrise)}`,
      sunSetTime: `Sun Set Time ${this.getTime(response.sys.sunset)}`
    };
    return cityData;
  }

  /**
   * To get proper time format
   * @param {number} timeStamp
   * @returns {string}
   */
  private getTime(timeStamp: number): string {
    const date = moment(timeStamp * 1000).format('HH:mm A');
    return date;
  }

  /**
   * To Map temperature and sealevel
   * @param response
   * @returns {ICity[]}
   */
  private mapTemperature(response: any): ICity[]{
    const filterdData = response.list.filter((data) => (new Date(data.dt_txt).getHours() === 9));
    const responseList = filterdData.map((temp) => {
      return {
        date: moment(temp.dt_txt).format('ddd DD'),
        temperature: `${Math.floor(temp.main.temp)}°C`,
        seaLevel: `${temp.main.sea_level} hPa`
      };
    });
    return responseList;
  }
}
