import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit{
  constructor(private weatherService:WeatherService) {}
  ngOnInit(): void {
    this.selectedCountry = this.weatherService.selectedCountry;
    console.log(this.selectedCountry)

    this.onCountrySelectionChange()

    
  }

  countryData:any
  countries: string[] = Object.keys(this.weatherService.countryCityData);
  countryCityMap = this.weatherService.countryCityData;

  cities: string[] = [];
  selectedCity: string;
  selectedCountry:string

  onCountrySelectionChange() {
    this.cities = this.countryCityMap[this.selectedCountry] || [];
    this.selectedCity = null; // Reset the selected city when the country changes
  }

  weatherData:any
  onCitySelectionChange() {
    this.weatherService.getWeather(this.selectedCity).subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData)
    })
    console.log(this.weatherData);
  }
  
  convertTimestampToTime(timestamp: number): string {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }
  
}

