import { Component } from '@angular/core';
import { ToastController, LoadingController, NavController } from 'ionic-angular';
import { WeatherRequestProvider } from '../../providers/weather-request-provider/weather-request-provider';
import { SettingsProvider } from '../../providers/settings-storage-provider/settings-storage-provider';
import { SettingsPage } from '../settings/settings';
import { NewsRequestProvider } from '../../providers/news-request-provider/news-request-provider';
import { BookmarksStorageProvider } from '../../providers/bookmarks-storage-provider/bookmarks-storage';
import { Observable } from 'rxjs/Observable';
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

  fetchedNewsData: Observable<any>;
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
    console.log(this.fetchedWeatherData)
    this.dataLoaded= true;
    loader.dismiss();
    });
  }
  onNewsButtonClick(){
    const loader = this.loadingCtrl.create({
      content: 'Loading news...',
    });
    loader.present();
    this.newsRequestProvider.fetchNewsData(this.countryCode).subscribe(data => {
      this.fetchedNewsData = data.articles;
    })
    loader.dismiss();
  }

  getSpeedUnit(temperatureUnit: string){
    switch(temperatureUnit){
      case 'standard':
       return 'm/s'
      case 'metric':
        return 'm/s'
      case 'imperial':
        return 'mph'
    }
  }

  getCardinals(degree: number){
    if(degree >= 338 && degree <= 22){
      return 'North'
    }else if(degree >= 23 && degree <= 67){
      return 'NorthEast'
    }else if(degree >= 68 && degree <= 112){
      return 'East'
    }else if(degree >= 113 && degree <= 157){
      return 'SouthEast'
    }else if(degree >= 158 && degree <= 203){
      return 'South'
    }else if(degree >= 204 && degree <= 249){
      return 'SouthWest'
    }else if(degree >= 250 && degree <= 295){
      return 'West'
    }else if(degree >= 296 && degree <= 337){
      return 'NorthWest'
    }
    }


  getTemperatureUnit(temperatureUnit: string){
    switch(temperatureUnit){
      case 'standard':
       return '°K'
      case 'metric':
        return '°C'
      case 'imperial':
        return '°F'
    }
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

  rotateIcon(deg: number){
    const styles = {'transform' : `rotate(${deg}deg)`};
    return styles;
  }
}
