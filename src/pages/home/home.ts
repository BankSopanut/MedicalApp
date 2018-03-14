import { MapPage } from './../map/map';
import { AddMedicinePage } from './../add-medicine/add-medicine';
import { NotificationPage } from './../notification/notification';
import { SearchPage } from './../search/search';
import { HelpPage } from './../help/help';
import { ProfilePage } from './../profile/profile';
import { LoginPage } from './../login/login';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import BasePage from '../base';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { LogPage } from '../log/log';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BasePage {

  items = [];
  results = [];

  id: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public barcodeScanner: BarcodeScanner
  ) {
    super(toastCtrl, loadingCtrl);
  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }

  navigateSearch() {
    this.navCtrl.push(SearchPage);
  }

  navigateProfile() {
    this.navCtrl.push(ProfilePage);
  }

  navigateSetNotification() {
    this.navCtrl.push(NotificationPage);
  }

  navigateLog() {
    this.navCtrl.push(LogPage);
  }

  navigateHelp() {
    this.navCtrl.push(HelpPage);
  }

  navigateMap() {
    this.navCtrl.push(MapPage);
  }

  addMedicine() {
    this.navCtrl.push(AddMedicinePage);
  }

  scanBarcode(barcode) {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.navCtrl.push(SearchPage, {
        code: barcode
      });
    }, (err) => {
      // An error occurred
    });
  }

}
