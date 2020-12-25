import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { WeatherRequestProvider } from '../../providers/weather-request.provider/weather-request.provider';
import { SettingsProvider } from '../../providers/settings.provider/settings.provider';
import { SettingsPage } from '../settings/settings';
import { NewsRequestProvider } from '../../providers/news-request/news-request';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  settingsSet: boolean;
  dataLoaded: boolean = false;

  isLoading : boolean = false;

  fetchedWeatherData: any;
  city: string = null;
  temperatureUnit: string = null;
  countryCode: string = null;

  fetchedNewsData: any;
  articles: any;



  constructor(public navCtrl: NavController,
              private settingsProvider: SettingsProvider,
              private weatherRequestProvider: WeatherRequestProvider,
              private newsRequestProvider: NewsRequestProvider,
              private loadingCtrl: LoadingController
               ) {

  }

  ionViewDidEnter() {
    this.settingsProvider.getSettings().then((data) => {
        this.settingsSet = data.settingsSet;
        this.city = data.city;
        this.temperatureUnit = data.temperatureUnit;
    })
    .then(() => {
      this.fetchData(this.city, this.temperatureUnit);
    })
    .then(() => {

    });
  }

  onSettingsIconClick(){
    this.navCtrl.push(SettingsPage);
  }

  fetchData(city: string, temperatureUnit: string){
    const loader = this.loadingCtrl.create({
      content: 'Fetching data...',
    });
    loader.present();
    this.weatherRequestProvider.fetchWeatherData(city, temperatureUnit).subscribe(data => {
    this.fetchedWeatherData = data;
    this.countryCode = this.fetchedWeatherData.sys.country;
    this.dataLoaded= true;
    loader.dismiss();
    });
  }
  onNewsButtonClick(){
    const loader = this.loadingCtrl.create({
      content: 'Fetching news...',
    });
    loader.present();
    this.newsRequestProvider.fetchNewsData(this.countryCode).subscribe(data => {
      this.fetchedNewsData = data;
      this.articles = this.fetchedNewsData.articles;
      console.log(this.fetchedNewsData)
    })
    loader.dismiss();
  }
}
