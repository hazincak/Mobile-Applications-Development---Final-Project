import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dataLoaded: boolean = false;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {

  }

  onSettingsIconClick(){
    this.navCtrl.push(SettingsPage);
  }

}
