import { Injectable } from '@angular/core';

/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

  private _sendRequest: boolean = false;

  constructor() {
    console.log();
  }

  get sendRequest(){
    return this._sendRequest;
  }

  set sendRequest(value){
    this._sendRequest = value;
  }

  storeSettings(city: String, temperatureUnit: String){

  }

}
