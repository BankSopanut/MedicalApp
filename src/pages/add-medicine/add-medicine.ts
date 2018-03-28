import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import BasePage from '../base';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@Component({
  selector: 'page-add-medicine',
  templateUrl: 'add-medicine.html',
})
export class AddMedicinePage extends BasePage {

  barcode: string = '';
  name: string = '';
  cure: string = '';
  how: string = '';;
  forget: string = '';
  form: string = '';
  ingredients: string = '';
  type: string = '';
  keeping: string = '';
  warning: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseFirestore: AngularFirestore,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public barcodeScanner: BarcodeScanner
  ) {
    super(toastCtrl, loadingCtrl);
  }

  addMedicine() {
    this.showLoading("กำลังบันทึก...")
    this.firebaseFirestore
      .collection('Medicines')
      .add({
        barcode: this.barcode,
        name: this.name,
        cure: this.cure,
        how: this.how,
        forget: this.forget,
        form: this.form,
        ingredients: this.ingredients,
        type: this.type,
        keeping: this.keeping,
        warning: this.warning
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

  scanBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.barcode = barcodeData.text;
    });
  }
}
