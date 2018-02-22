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
import { SetNotificationPage } from '../set-notification/set-notification';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BasePage {

  items = [];
  results = [];

  uid: string = '';

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
    this.navCtrl.push(SetNotificationPage);
  }

  navigateHelp() {
    this.navCtrl.push(HelpPage);
  }

  getItemsFromCode(code) {

    if (code == '') {
      this.results = this.items;
    }

    if (code && code.trim() != '') {
      this.results = this.items.filter((item) => {
        return (item.data.barcode.toLowerCase().indexOf(code.toLowerCase()) > -1);
      })
    }
  }

  scanBarcode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.getItemsFromCode(barcodeData.text);
    }, (err) => {
      // An error occurred
    });
  }

}
