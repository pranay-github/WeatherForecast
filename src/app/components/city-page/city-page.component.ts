import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CONSTANTS } from '@root/app/constants/constant';
import { ICity } from '@root/app/models/city';
import { ForecastService } from '@root/app/services/forecast.service';

@Component({
  selector: 'city-page',
  templateUrl: './city-page.component.html',
  styleUrls: ['./city-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityPageComponent implements OnInit {
  public cityDetails: ICity[];
  public activeContent: ICity;
  public readonly header: string = CONSTANTS.cityPageHeader;
  private city: string;

  constructor(private service: ForecastService,
              private activatedRoute: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.city = this.activatedRoute.snapshot.params['name'];
    this.service.getTemperatureSeaLevel(this.city)
    .subscribe((response: ICity[]) => {
      this.cityDetails = response;
      [this.activeContent] = this.cityDetails;
      this.cityDetails[0].isActive = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  /**
   * To Set active tab
   * @param {number} index
   * @returns {void}
   */
  setActive(index: number): void {
    this.cityDetails.forEach((city) => city.isActive = false);
    this.cityDetails[index].isActive = true;
    this.activeContent = this.cityDetails[index];
  }

}
