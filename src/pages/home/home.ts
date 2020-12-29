import { Component } from '@angular/core';
import { ToastController, LoadingController, NavController } from 'ionic-angular';
import { WeatherRequestProvider } from '../../providers/weather-request-provider/weather-request-provider';
import { SettingsProvider } from '../../providers/settings-storage-provider/settings-storage-provider';
import { SettingsPage } from '../settings/settings';
import { NewsRequestProvider } from '../../providers/news-request-provider/news-request-provider';
import { BookmarksStorageProvider } from '../../providers/bookmarks-storage-provider/bookmarks-storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  settingsSet: boolean;
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
              private newsRequestProvider: NewsRequestProvider,
              private bookmarksStorageProvider: BookmarksStorageProvider,
              private loadingCtrl: LoadingController,
              public toastCtrl: ToastController
               ) {

  }

  ionViewDidEnter() {

    this.settingsProvider.getSettings().then((data) => {

        this.settingsSet = data.settingsSet;
        this.city = data.city;
        this.countryCode = data.countryCode;
        this.temperatureUnit = data.temperatureUnit;

    })
    .then(() => {
      this.fetchData(this.city, this.countryCode, this.temperatureUnit);
    })
    .catch(() => {})
  }

  onSettingsIconClick(){
    this.navCtrl.push(SettingsPage);
  }

  fetchData(city: string, countryCode: string, temperatureUnit: string){
    const loader = this.loadingCtrl.create({
      content: 'Fetching data...',
    });
    loader.present();
    this.weatherRequestProvider.fetchWeatherData(city, countryCode ,temperatureUnit).subscribe(data => {
    this.fetchedWeatherData = data;
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
    })
    loader.dismiss();
  }

  onBookmarksIconClick(item: any){
    this.bookmarksStorageProvider.bookmarkArticle(item);
    this.presentToast('Article was bookmarked successfully')
  }

  onItemClick(url: string){
    var win = window.open(url, '_blank');
    win.focus();
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
