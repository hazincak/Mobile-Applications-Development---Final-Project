import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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

  bookmarks = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private bookmarksStorageProvider: BookmarksStorageProvider,
              public toastCtrl: ToastController
              ) {
  }

  ionViewDidEnter() {
    this.getBookmarks();
    if(this.bookmarks == null){
      this.bookmarks = [];
    }
    console.log(this.bookmarks)

  }

  getBookmarks(){
    this.bookmarksStorageProvider.getBookmarks().then((data) => {
      this.bookmarks = data;
    }).then(() => {
      if (this.bookmarks.length == 0){
        this.bookmarks = null
      }
    })
  }

  onDeleteClick(removeIndex){
    this.bookmarksStorageProvider.deleteBookmark(removeIndex);
    this.bookmarks.splice(removeIndex, 1);
    this.presentToast('Bookmark was deleted successfully')
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
