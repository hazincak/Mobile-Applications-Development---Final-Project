import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpRequestsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherRequestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HttpRequestsProvider Provider');
  }

  fetchWeatherData(city: string, countryCode: string, temperatureUnit: string){
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=${temperatureUnit}&appid=0d8aa15d3feaefc17582393df3b73903`);
  }

  fetchCities(city: string){
    return this.http.get<any>(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=0d8aa15d3feaefc17582393df3b73903`)
  }

}
