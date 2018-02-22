import { MedicinePage } from './../pages/medicine/medicine';
import { SearchPage } from './../pages/search/search';
import { EditProfilePage } from './../pages/edit-profile/edit-profile';
import { SetNotificationPage } from './../pages/set-notification/set-notification';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { ProfilePage } from './../pages/profile/profile';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CallNumber } from '@ionic-native/call-number';
import { HelpPage } from '../pages/help/help';
import { EditContactPage } from '../pages/edit-contact/edit-contact';
import { AddContactPage } from '../pages/add-contact/add-contact';

var config = {
  apiKey: "AIzaSyB54AyELxFaVVzdp-FHYrEk7w6LV-4ATgo",
  authDomain: "medicalapp-89127.firebaseapp.com",
  databaseURL: "https://medicalapp-89127.firebaseio.com",
  projectId: "medicalapp-89127",
  storageBucket: "medicalapp-89127.appspot.com",
  messagingSenderId: "387729516381"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    LoginPage,
    RegisterPage,
    SetNotificationPage,
    EditProfilePage,
    HelpPage,
    EditContactPage,
    AddContactPage,
    SearchPage,
    MedicinePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    LoginPage,
    RegisterPage,
    SetNotificationPage,
    EditProfilePage,
    HelpPage,
    EditContactPage,
    AddContactPage,
    SearchPage,
    MedicinePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler, },
    LocalNotifications,
    BarcodeScanner,
    CallNumber
  ]
})
export class AppModule { }
