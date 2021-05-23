import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CONSTANTS } from '@app/constants/constant';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  countries: string[] = CONSTANTS.countries;

  constructor() { }

  ngOnInit(): void {
  }

}
