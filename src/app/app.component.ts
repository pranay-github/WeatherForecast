import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '@app/constants/constant';
import { ErrorService } from './services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  showError = false;
  readonly appConstant = CONSTANTS;
  constructor(private errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.errorService.error.subscribe((error: string) => {
      if (error) {
        this.showError = true;
      }
    });
  }
}
