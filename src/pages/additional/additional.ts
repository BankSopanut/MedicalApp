import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import BasePage from '../base';

@Component({
  selector: 'page-additional',
  templateUrl: 'additional.html',
})
export class AdditionalPage extends BasePage {

  barcode: string = '';
  name: string = '';
  ingredients: string = '';
  type: string = '';
  form: string = '';
  keeping: string = '';
  warning: string = '';

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
          this.ingredients = data.ingredients,
          this.type = data.type,
          this.keeping = data.keeping,
          this.warning = data.warning,

          this.hideLoading();
      },
        (error) => {
          this.hideLoading();
          this.showToast(error);
        })
  }

  back() {
    this.navCtrl.pop();
  }
}
