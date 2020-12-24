import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpRequestsProvider } from '../../providers/WeatherRequests.provider/WeatherRequests.provider';
import { SettingsProvider } from '../../providers/settings-provider/settings.provider';
import { SettingsPage } from '../settings/settings';
import {Settings} from '../settings/settings.model';
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

  constructor(public navCtrl: NavController,
              private settingsProvider: SettingsProvider,
              private httpRequestsProvider: HttpRequestsProvider) {

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
    this.httpRequestsProvider.fetchWeatherData(city, temperatureUnit).subscribe(data => {
      this.fetchedWeatherData = data;
      console.log(this.fetchedWeatherData);
      this.dataLoaded= true;
    });

  }


}
