import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { SettingsProvider } from '../../providers/settings-storage-provider/settings-storage-provider';
import { WeatherRequestProvider } from '../../providers/weather-request-provider/weather-request-provider';

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
  city: string = null;
  countryCode: string;
  temperatureUnit: string = null;

  listOfCities: Observable<any>;

  cityValidated = false;
  cityErrorMessage = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private settingsProvider: SettingsProvider,
              private loadingCtrl: LoadingController,
              public weatherRequestProvider: WeatherRequestProvider,
              ) {
  }

  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      temperatureUnit: new FormControl(null, {}),
      city: new FormControl(null , {})
    });
  }

  ionViewDidLoad() {
    this.cityValidated = false;
    this.settingsProvider.getSettings().then((data) => {
      this.setValues(data);
    })
    .then(() => {
      this.setForm();
      this.cityValidated = true
    })
    .catch(()=>{
    })
  }

  ionViewWillLeave(){
    console.log(this.settingsForm)
    if(this.settingsForm.pristine){
      this.noDataAlert();
    }
  }

  setValues(data: any){
    this.settingsSet = data.settingsSet;
    this.city = data.city;
    this.countryCode = data.countryCode;
    this.temperatureUnit = data.temperatureUnit;
  }

  setForm(){
    this.settingsForm.controls.city.setValue(this.city);
    this.settingsForm.controls.temperatureUnit.setValue(this.temperatureUnit);
  }

  onSubmit(){
    const loader = this.loadingCtrl.create({
      content: 'Saving data...',
    });
    loader.present();
    if(this.settingsForm.controls.temperatureUnit.pristine && this.temperatureUnit == null){
      return;
    }else if(this.settingsForm.controls.city.pristine && this.city === null){
      this.noCityAlert();
      this.settingsForm.controls.city.setValue('Galway');
      this.settingsProvider.settingsSet = true;
      this.settingsProvider.storeSettings(this.settingsForm.controls.city.value, "IE", this.settingsForm.controls.temperatureUnit.value);
    }else if(this.settingsForm.controls.city.dirty && this.city !== null && this.cityValidated){
      this.settingsProvider.settingsSet = true;
      this.settingsProvider.storeSettings(this.settingsForm.controls.city.value, this.countryCode, this.settingsForm.controls.temperatureUnit.value);
    }else if(this.cityValidated && this.settingsForm.controls.city.untouched){
      this.settingsProvider.settingsSet = true;
      this.settingsProvider.storeSettings(this.settingsForm.controls.city.value, this.countryCode, this.settingsForm.controls.temperatureUnit.value);
    }else if(!this.cityValidated){
      this.cityErrorMessage = "Select your city"
    }
    loader.dismiss();
  }

  findLocation(){
      this.cityValidated = false
      let cityInputField = this.settingsForm.controls.city.value;
      this.weatherRequestProvider.fetchCities(cityInputField)
      .subscribe(data => {

        if(data.length === 0){
          this.cityValidated = false
          this.cityErrorMessage = 'City not found'
        }else{
          this.listOfCities = data;
          this.cityErrorMessage = null;
        }
    })
  }

  onCityClick(item){
    this.city = item.name;
    this.countryCode = item.country;
    this.cityValidated = true;
    this.listOfCities = null;
    this.cityErrorMessage = null;
  }

  async noDataAlert(){
    const alert = await this.alertCtrl.create({
      title: 'No changes were detected!',
      subTitle: 'Nothing is saved!',
      buttons:['ok']
    });
    alert.present();
  }

  async noCityAlert(){
    const alert = await this.alertCtrl.create({
      title: 'No city was selected!',
      subTitle: "Galway is set for your location!",
      buttons:['ok']
    });
    alert.present();
  }

}
