import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import BasePage from '../base';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Component({
  selector: 'page-log',
  templateUrl: 'log.html',
})
export class LogPage extends BasePage {

  uid: string;

  items = [];
  results = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    super(toastCtrl, loadingCtrl);
  }

  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid;

    this.showLoading("กำลังดึงข้อมูล...")
    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .collection('logs')
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

  delete(logID) {
    this.showLoading("กำลังลบ...")
    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .collection('logs')
      .doc(logID)
      .delete()
      .then(() => {
        this.hideLoading();
        this.showToast("Deleted sucessfully");
      })
      .catch(error => {
        this.hideLoading();
        this.showToast(error);
      });
  }
}
