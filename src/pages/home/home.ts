import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherRequestProvider } from '../../providers/weather-request.provider/weather-request.provider';
import { SettingsProvider } from '../../providers/settings.provider/settings.provider';
import { SettingsPage } from '../settings/settings';
import { NewsRequestProvider } from '../../providers/news-request/news-request';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  sendRequest: boolean;
  dataLoaded: boolean = false;

  fetchedWeatherData: any;
  city: string = null;
  temperatureUnit: string = null;
  countryCode: string = null;

  fetchedNewsData: any;
  articles: any;



  constructor(public navCtrl: NavController,
              private settingsProvider: SettingsProvider,
              private weatherRequestProvider: WeatherRequestProvider,
              private newsRequestProvider: NewsRequestProvider ) {

  }

  ionViewDidEnter() {
    this.sendRequest = this.settingsProvider.sendRequest;
    if(this.sendRequest){
        this.settingsProvider.getSettings().then((data) => {
          this.city = data.city;
          this.temperatureUnit = data.temperatureUnit;
          this.fetchData(this.city, this.temperatureUnit);
        });
    }else if(this.city !== null && this.temperatureUnit !==null){
      console.log('sending request')

    }
  }

  onSettingsIconClick(){
    this.navCtrl.push(SettingsPage);
  }

   fetchData(city: string, temperatureUnit: string){
    this.weatherRequestProvider.fetchWeatherData(city, temperatureUnit).subscribe(data => {
      this.fetchedWeatherData = data;
      console.log(this.fetchedWeatherData);
      this.countryCode = this.fetchedWeatherData.sys.country;
      console.log(this.countryCode);
      this.dataLoaded= true;
    });
  }
  onNewsButtonClick(){
    this.newsRequestProvider.fetchNewsData(this.countryCode).subscribe(data => {
      this.fetchedNewsData = data;
      this.articles = this.fetchedNewsData.articles;
      console.log(this.fetchedNewsData)
    })
  }


}
