import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForecastService } from '@app/services/forecast.service';
import { ICity } from '@app/models/city';

@Component({
  selector: 'city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityCardComponent implements OnInit {
  @Input() city: string;
  cityData: any;

  constructor(private service: ForecastService,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router) { }

  ngOnInit(): void {
    this.service.getCitiesInformation(this.city)
    .subscribe((data: ICity) => {
      this.cityData = data;
      this.changeDetectorRef.markForCheck();
    });
  }

  /**
   * To Get Image URL
   * @returns {string}
   */
  getImageURL(): string {
    return `../../../assets/images/${this.city.toLowerCase()}.png`;
  }

  /**
   * triggered on card click
   */
  onCardClick(): void {
    this.router.navigate(['city-page', this.city]);
  }

}
