import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import BasePage from '../base';

@Component({
  selector: 'page-dispense',
  templateUrl: 'dispense.html',
})
export class DispensePage extends BasePage {

  uid: string;
  id: string;

  name: string;
  date: string;
  dose: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    super(toastCtrl, loadingCtrl);
    this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    this.firebaseFirestore
      .collection('Medicines')
      .doc(this.id)
      .valueChanges()
      .subscribe((medicine: any) => {
        this.name = medicine.name
      })
  }

  dispense() {
    this.showLoading("กำลังบันทึก...")
    this.firebaseFirestore
      .collection('users')
      .doc(this.firebaseAuth.auth.currentUser.uid)
      .collection('logs')
      .add({
        name: this.name,
        date: this.date,
        dose: this.dose,
      })
      .then(() => {
        this.showToast("บันทึกข้อมูลเสร็จสิ้น");
        this.hideLoading();

        this.navCtrl.pop();
      })
      .catch(error => {
        this.showToast(error);
        this.hideLoading();
      })
  }
}
