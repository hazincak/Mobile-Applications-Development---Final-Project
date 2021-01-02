import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

/*
  Generated class for the NewsRequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsRequestProvider {

  constructor(public http: HttpClient) {}


  fetchNewsData(country: string, pageSize: number){
    return this.http.get<any>(`https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&apiKey=47c2f415725e4a94b8c8bd895cc09596`)
 }

  // fetchNewsData(country: string){
  //    return this.http.get<any>(`https://newsapi.org/v2/top-headlines?country=${country}&pageSize=5&apiKey=47c2f415725e4a94b8c8bd895cc09596`)
  // }

}
