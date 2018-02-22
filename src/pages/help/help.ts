import { AddContactPage } from './../add-contact/add-contact';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import BasePage from '../base';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { EditContactPage } from '../edit-contact/edit-contact';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage extends BasePage {

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
    public callNumber: CallNumber
  ) {
    super(toastCtrl, loadingCtrl);
  }

  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid;

    this.showLoading("Fetching Data...")
    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .collection('Contacts')
      .snapshotChanges()
      .subscribe(data => {
        this.items = [];

        data.map(action => {
          this.items.push({
            id: action.payload.doc.id,
            data: action.payload.doc.data()
          })
        });

        this.results = this.items;

        this.hideLoading();
      },
        (error) => {
          this.hideLoading();
          this.showToast(error);
        })
  }
  call(Contacttel) {
    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .collection('Contacts')
      .doc(Contacttel)

    this.callNumber.callNumber(Contacttel, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }
}
