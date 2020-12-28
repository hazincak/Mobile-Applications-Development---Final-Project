import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

/*
  Generated class for the BookmarksStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookmarksStorageProvider {

  constructor(public http: HttpClient,
              public storage: Storage,
              public events: Events) {}

  bookmarkArticle(item: any){

    let tempBookmarks = new Array();
    this.getBookmarks().then((data) => {
      if(data !== null){
        tempBookmarks = data;
      }
    }).then(()=>{
      tempBookmarks.push(item)
    }).then(()=> {
      this.storage.remove('bookmarks-json');
      this.storage.set('bookmarks-json', tempBookmarks);

    }).then(()=>{
      this.events.publish('bookmarks:updated');
    })
  }

  getBookmarks(){
    return this.storage.get('bookmarks-json');
  }

  deleteBookmark(removeIndex){
    let tempBookmarks = new Array();
    this.getBookmarks().then((data) => {
      if(data !==null){
        tempBookmarks = data
      }
    })
    .then(() => {
      tempBookmarks.splice(removeIndex, 1);
    })
    .then(() => {
      this.storage.remove('bookmarks-json');
      this.storage.set('bookmarks-json', tempBookmarks);
    })
    .then(() => {
      this.events.publish('bookmarks:updated');
    })
  }
}
