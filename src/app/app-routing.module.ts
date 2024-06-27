import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CountryInfoComponent } from './country-info/country-info.component';

const routes: Routes = [
  {path: "", component: MainComponent},
  {path: "info", component: CountryInfoComponent},
  {path: "info/:name", component: CountryInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
