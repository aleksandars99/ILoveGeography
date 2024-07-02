import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { countries } from './countries';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService  {

  constructor( private http: HttpClient) { }

  private apiUrl = "https://restcountries.com/v3.1/name"
  private apiNames = "https://restcountries.com/v3.1/all"
  currentCountry:any;

  getCountry(countryName: string):Observable<any> {
    return this.http.get<any>(this.apiUrl+'/'+countryName)
  }
  
  returnCountryNames(): Observable<countries[]> {
    return this.http.get<countries[]>(this.apiNames);
  }
  
}
