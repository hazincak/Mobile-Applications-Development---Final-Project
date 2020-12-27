import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Page } from 'ionic-angular/umd/navigation/nav-util';
import { SettingsProvider } from '../../providers/settings.provider/settings.provider';
import { HomePage } from '../home/home';



/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit {

  settingsForm: FormGroup;
  settingsSet: boolean;
  city: string;
  temperatureUnit: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private settingsProvider: SettingsProvider,
              private loadingCtrl: LoadingController,
              ) {
  }

  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      temperatureUnit: new FormControl(null, {

      }),
      city: new FormControl(null, {

      })
    });

  }

  ionViewDidLoad() {
    this.settingsProvider.getSettings().then((data) => {
      this.settingsSet = data.settingsSet;
      this.city = data.city;
      this.temperatureUnit = data.temperatureUnit;
  })
  .catch(()=>{

  })
  }

  ionViewWillLeave(){


    if(this.settingsForm.untouched){
      this.noDataAlert();
    }
  }

  onSubmit(){
    const loader = this.loadingCtrl.create({
      content: 'Saving data...',
    });
    loader.present();
    if(!this.settingsForm.controls.temperatureUnit.dirty && !this.settingsForm.controls.city.dirty){
      return;
    }else if(this.settingsForm.controls.city.untouched && this.city === null){
      this.noCityAlert();
      this.settingsForm.controls.city.setValue('Galway');
      this.navCtrl.push(HomePage);
      this.settingsProvider.settingsSet = true;
      this.settingsProvider.storeSettings(this.settingsForm.controls.city.value, this.settingsForm.controls.temperatureUnit.value);
    }else if(this.settingsForm.controls.city.touched){
      this.navCtrl.push(HomePage);
      this.settingsProvider.settingsSet = true;
      this.settingsProvider.storeSettings(this.settingsForm.controls.city.value, this.settingsForm.controls.temperatureUnit.value);
    }else if(this.settingsForm.controls.temperatureUnit.touched){
      this.navCtrl.push(HomePage);
      this.settingsProvider.settingsSet = true;
      this.settingsProvider.storeSettings(this.city, this.settingsForm.controls.temperatureUnit.value);
    }
    loader.dismiss();
  }

  async noDataAlert(){
    const alert = await this.alertCtrl.create({
      title: 'No changes detected',
      subTitle: 'Nothing will be saved',
      buttons:['ok']
    });
    alert.present();
  }

  async noCityAlert(){

    const alert = await this.alertCtrl.create({
      title: 'No city selected',
      subTitle: "Galway will be set for your location!",
      buttons:['ok']
    });
    alert.present();
  }

}
