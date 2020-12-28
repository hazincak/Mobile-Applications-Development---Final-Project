import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the BookmarksStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookmarksStorageProvider {

  newBookmarks = new Array();

  constructor(public http: HttpClient,
              public storage: Storage) {}

  bookmarkArticle(item: any){
    this.newBookmarks.push(item)
    this.getBookmarks().then((data) => {
      this.newBookmarks.push(data);
    })
    this.storage.remove('articles-json');
    this.storage.set('articles-json', this.newBookmarks);
  }

  getBookmarks(){
    return this.storage.get('articles-json');
  }

  getBookmarksAmount(){

  }
}
