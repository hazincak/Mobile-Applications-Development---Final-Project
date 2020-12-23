import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      temperatureUnit: new FormControl(null, {

      }),
      city: new FormControl(null, {
        validators:[Validators.required]
      })
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  ionViewWillLeave(){

    console.log(this.settingsForm)
    if(this.settingsForm.untouched){
      this.noDataAlert();
    }
  }

  onSubmit(){
    if(this.settingsForm.controls.temperatureUnit.untouched){
      return;
    }else if(this.settingsForm.controls.city.untouched){
         this.noCityAlert();
         this.settingsForm.controls.city.setValue('Galway');
         this.navCtrl.push(HomePage);
    }

    console.log(this.settingsForm);
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
