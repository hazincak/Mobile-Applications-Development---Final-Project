import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookmarksStorageProvider } from '../../providers/bookmarks-storage-provider/bookmarks-storage';
import { NewsRequestProvider } from '../../providers/news-request-provider/news-request-provider';
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
  tab2Root = SettingsPage;
  tab3Root = BookmarksPage;

  bookmarksAmount: number
  articles: any

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private bookmarksStorageProvider: BookmarksStorageProvider
              ) {
  }

  ionViewDidLoad() {
    this.bookmarksStorageProvider.getBookmarksAmount();
  }

}
