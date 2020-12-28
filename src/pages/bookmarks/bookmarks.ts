import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookmarksStorageProvider } from '../../providers/bookmarks-storage-provider/bookmarks-storage';
import { NewsRequestProvider } from '../../providers/news-request-provider/news-request-provider';

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

  bookmarks = new Array();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private bookmarksStorageProvider: BookmarksStorageProvider
              ) {
  }

  ionViewDidEnter() {
    this.bookmarksStorageProvider.getBookmarks().then((data) => {
      this.bookmarks = data;
      console.log(this.bookmarks)
    })
  }

  onDeleteClick(){

  }

}
