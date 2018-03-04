import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import BasePage from '../base';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Component({
  selector: 'page-edit-contact',
  templateUrl: 'edit-contact.html',
})
export class EditContactPage extends BasePage {

  uid: string;
  id:string;

  name: string;
  tel: string;

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
    this.uid = this.firebaseAuth.auth.currentUser.uid;

    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .collection('Contacts')
      .doc(this.id)
      .valueChanges()
      .subscribe((contact: any) => {
        this.name = contact.name,
          this.tel = contact.tel
      })
  }

  save() {
    this.showLoading("กำลังแก้ไข...")
    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .collection('Contacts')
      .doc(this.id)
      .update({
        name: this.name,
        tel: this.tel
      })
      .then(() => {
        this.showToast("แก้ไขข้อมูลเสร็จสิ้น");
        this.hideLoading();
          
        this.navCtrl.pop();
      })
      .catch(error => {
        this.showToast(error);
        this.hideLoading();
      })
  }

}
