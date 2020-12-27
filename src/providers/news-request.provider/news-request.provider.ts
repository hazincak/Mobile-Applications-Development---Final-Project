import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the NewsRequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsRequestProvider {

  newBookmark = new Array();
  constructor(public http: HttpClient,
              private storage: Storage) {}

  bookmarkArticle(item: any){
    this.newBookmark.push(item)
    this.storage.set('articles-json', this.newBookmark);
  }

  getBookmarks(){
    return this.storage.get('articles-json');
  }

  getBookmarksAmount(){

  }

  fetchNewsData(country: string){
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=${country}&pageSize=5&apiKey=47c2f415725e4a94b8c8bd895cc09596`)
  }

}
