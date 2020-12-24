import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

  private _sendRequest: boolean = false;

  constructor(public storage: Storage) {
  }

  get sendRequest(){
    return this._sendRequest;
  }

  set sendRequest(value){
    this._sendRequest = value;
  }

  storeSettings(city: String, temperatureUnit: String){
    let storedSettings = {"city":city, "temperatureUnit":temperatureUnit}
    this.storage.set('settings-json', storedSettings);
  }

  getSettings(){
    return this.storage.get('settings-json');
  }

}
