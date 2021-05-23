import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@app/components/home/home.component';
import { CityPageComponent } from './components/city-page/city-page.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'city-page/:name',
  component: CityPageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
