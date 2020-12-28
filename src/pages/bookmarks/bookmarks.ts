import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookmarksStorageProvider } from '../../providers/bookmarks-storage-provider/bookmarks-storage';


/**
 * Generated class for the BookmarksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookmarks',
  templateUrl: 'bookmarks.html',
})
export class BookmarksPage {

  bookmarks = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private bookmarksStorageProvider: BookmarksStorageProvider
              ) {
  }

  ionViewDidEnter() {
    this.getBookmarks();
  }

  getBookmarks(){
    this.bookmarksStorageProvider.getBookmarks().then((data) => {
      this.bookmarks = data;
    })
  }

  onDeleteClick(removeIndex){
    this.bookmarksStorageProvider.deleteBookmark(removeIndex);
    this.bookmarks.splice(removeIndex, 1);
  }

}
