import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, NavController, AlertController } from 'ionic-angular';
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


export class HomePage implements OnInit {
  settingsSet: boolean;
  dataLoaded: boolean = false;

  fetchedWeatherData: any;
  city: string = null;
  temperatureUnit: string = null;
  countryCode: string = null;

  fetchedNewsData: Observable<any>;
  articles: any;
  articlesDisplayed: number = 5

  constructor(public navCtrl: NavController,
              private settingsProvider: SettingsProvider,
              private weatherRequestProvider: WeatherRequestProvider,
              private newsRequestProvider: NewsRequestProvider,
              private bookmarksStorageProvider: BookmarksStorageProvider,
              private loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController
               ) {

  }

  ngOnInit() {
    this.getSettings();
  }

  ionViewDidEnter() {
    this.getSettings();
  }

  onSettingsIconClick(){
    this.navCtrl.push(SettingsPage);
  }

  fetchWeatherData(city: string, countryCode: string, temperatureUnit: string){
    this.weatherRequestProvider.fetchWeatherData(city, countryCode ,temperatureUnit).subscribe(data => {
    this.fetchedWeatherData = data;
    this.dataLoaded= true;
    },
    error => {
      if(error.status === 404){
        const alert = this.alertCtrl.create({
          title: 'Invalid Data',
          subTitle: 'Please enter a valid city',
          buttons: ['OK']
        });
        alert.present();
      }
    })
  }

  getSettings(){
    const loader = this.loadingCtrl.create({
      content: 'Loading data...',
    });
    loader.present();
    this.settingsProvider.getSettings().then((data) => {
      this.settingsSet = data.settingsSet;
      this.city = data.city;
      this.countryCode = data.countryCode;
      this.temperatureUnit = data.temperatureUnit;

  })
  .then(() => {
    this.fetchWeatherData(this.city, this.countryCode, this.temperatureUnit);
  })
  .then(() => {
    loader.dismiss();
  })
  .catch(() => {
    loader.dismiss();
  })
  }

  onNewsButtonClick(){
    this.fetchNewsData();
  }

  onChange(){
    this.fetchNewsData();
  }

  fetchNewsData(){
    const loader = this.loadingCtrl.create({
      content: 'Loading news...',
    });
    loader.present();
    this.newsRequestProvider.fetchNewsData(this.countryCode, this.articlesDisplayed).subscribe(data => {
      this.fetchedNewsData = data.articles;
      console.log(data);
    },
    error => {
      if(error.status === 429){
        const alert = this.alertCtrl.create({
          title: 'You have exceeded maximum number of requests allowed for an user',
          subTitle: 'Please try later.',
          buttons: ['OK']
        });
        alert.present();
      }
    }
    )
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

  getCardinals(deg: number){
    if (deg>11.25 && deg<=33.75){
      return "NNE";
    }else if (deg>33.75 && deg<=56.25){
      return "ENE";
    }else if (deg>56.25 && deg<=78.75){
      return "E";
    }else if (deg>78.75 && deg<=101.25){
      return "ESE";
    }else if (deg>101.25 && deg<=123.75){
      return "ESE";
    }else if (deg>123.75 && deg<=146.25){
      return "SE";
    }else if (deg>146.25 && deg<=168.75){
      return "SSE";
    }else if (deg>168.75 && deg<=191.25){
      return "S";
    }else if (deg>191.25 && deg<=213.75){
      return "SSW";
    }else if (deg>213.75 && deg<=236.25){
      return "SW";
    }else if (deg>236.25 && deg<=258.75){
      return "WSW";
    }else if (deg>258.75 && deg<=281.25){
      return "W";
    }else if (deg>281.25 && deg<=303.75){
      return "WNW";
    }else if (deg>303.75 && deg<=326.25){
      return "NW";
    }else if (deg>326.25 && deg<=348.75){
      return "NNW";
    }else{
      return "N";
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
      deg = deg + 180;
      const styles = {'transform' : `rotate(${deg}deg)`};
      return styles;
  }

}

