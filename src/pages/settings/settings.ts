import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
      public navParams: NavParams) {
  }

  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      temperatureUnit: new FormControl(null, {
        validators:[Validators.required]
      }),
      city: new FormControl(null, {
        validators:[Validators.required]
      })
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  onSubmit(){
    console.log(this.settingsForm);
  }

}
