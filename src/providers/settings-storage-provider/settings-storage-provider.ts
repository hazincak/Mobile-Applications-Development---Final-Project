import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

  private _settingsSet: boolean = false;

  constructor(public storage: Storage) {
  }

  get settingsSet(){
    return this._settingsSet;
  }

  set settingsSet(value){
    this._settingsSet = value;
  }

  storeSettings(city: String, countryCode: string, temperatureUnit: String){
    let storedSettings = {
      "city":city,
      "countryCode": countryCode,
      "temperatureUnit":temperatureUnit,
      "settingsSet": true }
    this.storage.set('settings-json', storedSettings);
  }

  getSettings(){
    return this.storage.get('settings-json');
  }

}
