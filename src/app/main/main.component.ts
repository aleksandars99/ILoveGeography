import { Component, ElementRef, OnInit, Renderer2, ViewChild, inject, viewChild } from '@angular/core';
import { countries } from '../countries';
import { CountriesService } from '../countries.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { WeatherComponent } from '../weather/weather.component';
import { WeatherService } from '../weather.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  @ViewChild('drawer') drawer: MatSidenav;
  @ViewChild('drawer2') drawer2: MatSidenav;
  // countryData:any
  constructor(private countriesService: CountriesService, private route:Router, private renderer: Renderer2, private el: ElementRef, private weatherService: WeatherService) {

  }
  ngOnInit(): void {
    this.countriesService.returnCountryNames().subscribe(
      (data:countries[]) => {
        this.countryNames = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        console.log(this.countryNames);
      },
      error => {
        console.log("fetching country names failed", error);
      }
    );
    console.log(typeof(this.drawer))

    const activeCountry = this.el.nativeElement.querySelectorAll('.allPaths');
    activeCountry.forEach((country:any) => {
      country.addEventListener('click', () => {
        this.el.nativeElement.querySelector('.active')?.classList.remove('active');
        country.classList.add('active')
        if (this.drawer.opened==false) {
          console.log("Its closedddd")
        }
    })
    }) 

    

    
  }

  showsidenav = false
  country: countries = new countries
  countryList: any
  showSidenav = false
  countryNames: countries[] = []
  filteredCountries: countries[];

  //here we load the country data to the sidenav
  showMore(country: any) {
    this.countriesService.getCountry(country).subscribe(data => {
      this.countryList = data[0];
      console.log(this.countryList)
    })
    this.drawer.toggle()

    this.weatherService.selectedCountry = country;
    console.log(this.weatherService.selectedCountry)
  }
  showMore2(country: any, city:string) {
    this.countriesService.getCountry(country).subscribe(data => {
      this.countryList = data[0];
      console.log(this.countryList)
    })
    this.drawer.toggle()

    this.weatherService.selectedCountry = country;
    console.log(this.weatherService.selectedCountry)

    this.weatherService.getWeather(city).subscribe(data => {
       this.weatherService.countryData = data;
       console.log(this.weatherService.countryData)
     })
  }
  returnWeather(cityName:string) {
    this.weatherService.getWeather(cityName).subscribe(data => {
      console.log(data)
      this.weatherService.selectedCountry = data
      console.log(this.weatherService.selectedCountry)
    })
  }

  //number formated from 10527356 to 10,527,356
  formatedNumber(number: number):string {
    return number.toLocaleString('en-US');
  }

  //we return currencies
  getCurrencyKeys(currencies: any): string[] {
    return Object.keys(currencies);
  }

  //we return languages
  getLanguageKeys(languages: any): string[] {
    return Object.keys(languages);
  }

  //we return timezones
  getTimezoneKeys(timezone: string[]):string [] {
    return timezone
  }

  //we return last language
  isLastLanguage(key: string): boolean {
    const keys = this.getLanguageKeys(this.countryList.languages);
    return keys[keys.length - 1] === key;
  }

  filterPipe = ''
  showMenu() {
    this.drawer2.toggle();
  }

  readonly dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(WeatherComponent, {height:'60%', width:'60%'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  
}
