import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';

import { SettingsProvider } from '../providers/settings-storage-provider/settings-storage-provider';
import { IonicStorageModule } from '@ionic/storage';
import { WeatherRequestProvider } from '../providers/weather-request-provider/weather-request-provider';
import { HttpClientModule } from '@angular/common/http';
import { NewsRequestProvider } from '../providers/news-request-provider/news-request-provider';
import { TabsPage } from '../pages/tabs/tabs';
import { BookmarksPage } from '../pages/bookmarks/bookmarks';
import { BookmarksStorageProvider } from '../providers/bookmarks-storage-provider/bookmarks-storage';





@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage,
    TabsPage,
    BookmarksPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage,
    BookmarksPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingsProvider,
    WeatherRequestProvider,
    NewsRequestProvider,
    BookmarksStorageProvider,
  ]
})
export class AppModule {}
