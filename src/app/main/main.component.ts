import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { countries } from '../countries';
import { CountriesService } from '../countries.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  @ViewChild('drawer') drawer: MatSidenav;
  countryData:any
  constructor(private countriesService: CountriesService, private route:Router) {}

  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
  }
  toggle = true
  status = "Enable"
  showsidenav = false
  country: countries = new countries
  countryList: any
  showSidenav = false

  showMore(country: string) {
    this.countriesService.getCountry(country).subscribe(data => {
      this.countryList = data[0];
      console.log(this.countryList)
    })
    this.drawer.toggle();
  }
  formatedNumber(number: number):string {
    return number.toLocaleString('en-US');
  }
  getCurrencyKeys(currencies: any): string[] {
    return Object.keys(currencies);
  }
  getLanguageKeys(languages: any): string[] {
    return Object.keys(languages);
  }
  getTimezoneKeys(timezone: string[]):string [] {
    return timezone
  }
  isLastLanguage(key: string): boolean {
    const keys = this.getLanguageKeys(this.countryList.languages);
    return keys[keys.length - 1] === key;
  }
}
