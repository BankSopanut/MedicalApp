import { MapPage } from './../map/map';
import { AddMedicinePage } from './../add-medicine/add-medicine';
import { NotificationPage } from './../notification/notification';
import { SearchPage } from './../search/search';
import { HelpPage } from './../help/help';
import { ProfilePage } from './../profile/profile';
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
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BasePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public barcodeScanner: BarcodeScanner,
    public moblieAccessibility: MobileAccessibility
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

  scanBarcode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.navCtrl.push(SearchPage, {
        code: barcodeData.text
      });
    }, (err) => {
      // An error occurred
    });
  }

  // async sayText(): Promise<any> {
  //   try {
  //     await this.tts.speak({
  //       text: this.TextToSpeech,
  //       locale: "th_TH_TH_#u-nu-thai"
  //     });
  //     console.log("successfully spoke" + this.TextToSpeech);
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  // }

}
