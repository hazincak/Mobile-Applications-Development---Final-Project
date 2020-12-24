import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpRequestsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpRequestsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HttpRequestsProvider Provider');
  }

  fetchWeatherData(city: string, temperatureUnit: string){
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${temperatureUnit}&appid=0d8aa15d3feaefc17582393df3b73903`);
  }

}
