import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookmarksStorageProvider } from '../../providers/bookmarks-storage-provider/bookmarks-storage';
import { BookmarksPage } from '../bookmarks/bookmarks';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab3Root = BookmarksPage;

  bookmarksAmount;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private bookmarksStorageProvider: BookmarksStorageProvider,
              public events: Events
              ) { events.subscribe('bookmarks:updated', () => {
                this.getBookmarksAmount();
              });
            }

   ionViewDidLoad() {
     this.getBookmarksAmount();
  }

   getBookmarksAmount(){
    this.bookmarksStorageProvider.getBookmarks().then((data) => {
      if(data){
        this.bookmarksAmount = data.length;
      }

    })

  }

}
