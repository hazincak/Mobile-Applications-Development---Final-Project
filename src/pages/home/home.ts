import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  sendRequest: boolean;
  dataLoaded: boolean = false;

  constructor(public navCtrl: NavController,
              private settingsProvider: SettingsProvider) {

  }

  ionViewDidEnter() {
    this.sendRequest = this.settingsProvider.sendRequest;
    if(this.sendRequest){
      console.log('Fetching Data')
    }
  }

  onSettingsIconClick(){
    this.navCtrl.push(SettingsPage);
  }



}
