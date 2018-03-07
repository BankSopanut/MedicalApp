import { DispensePage } from './../dispense/dispense';
import { AdditionalPage } from './../additional/additional';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import BasePage from '../base';

@Component({
  selector: 'page-medicine',
  templateUrl: 'medicine.html',
})
export class MedicinePage extends BasePage {

  barcode: string = '';
  name: string = '';
  cure: string = '';
  how: string = '';;
  forget: string = '';
  form: string = '';

  id: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseFirestore: AngularFirestore,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    super(toastCtrl, loadingCtrl);
    this.id = this.navParams.get('id');
  }

  ionViewDidLoad(medicineID) {

    this.showLoading("กำลังดึงข้อมูล...")
    this.firebaseFirestore
      .collection('Medicines')
      .doc(this.id)
      .valueChanges()
      .subscribe((data: any) => {
        this.barcode = data.barcode,
          this.name = data.name,
          this.cure = data.cure,
          this.how = data.how,
          this.forget = data.forget,
          this.form = data.form,

        this.hideLoading();
      },
        (error) => {
          this.hideLoading();
          this.showToast(error);
        })
  }

  dispense(medicineID) {
    this.navCtrl.push(DispensePage, {
      id: medicineID
    });
  }

  additional(medicineID) {
    this.navCtrl.push(AdditionalPage, {
      id: medicineID
    });
  }
}
