import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { HomeComponent } from '@app/components/home/home.component';
import { CityCardComponent } from '@app/components/city-card/city-card.component';
import { CityPageComponent } from '@app/components/city-page/city-page.component';
import { CustomInterceptorService } from '@app/services/custom-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CityCardComponent,
    CityPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptorService,
    multi: true
  }, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
