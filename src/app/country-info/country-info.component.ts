import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { countries } from '../countries';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrl: './country-info.component.css'
})
export class CountryInfoComponent implements OnInit {

  constructor (private countriesService:CountriesService, private route:Router) {}
  ngOnInit(): void {
    this.loadCountryData(this.currentCountry)
  }
  country: countries = new countries
  currentCountry = this.countriesService.currentCountry;
  showSidenav = true
  

  countryList:any
  loadCountryData(county:string) {
    this.countriesService.getCountry(county).subscribe(data =>{
      this.countryList = data[0];
      console.log(this.countryList)
    })
  }

  return() {
    window.history.back()
   // this.route.navigate([''])
}
}
