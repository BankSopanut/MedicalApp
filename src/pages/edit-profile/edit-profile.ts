import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import BasePage from '../base';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage extends BasePage {

  uid: string;

  name: string;
  email: string;
  gender: string;
  age: number;
  tel: string;
  height: number;
  weight: number;
  intolerance: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore
  ) {
    super(toastCtrl, loadingCtrl);
  }

  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid;

    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .valueChanges()
      .subscribe((data: any) => {
        this.name = data.name,
          this.age = data.age,
          this.gender = data.gender,
          this.tel = data.tel,
          this.height = data.height,
          this.weight = data.weight,
          this.intolerance = data.intolerance
      })
  }

  save() {
    this.showLoading("Updating...")
    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .update({
        name: this.name,
        age: this.age,
        gender: this.gender,
        tel: this.tel,
        Height: this.height,
        Weight: this.weight,
        intolerance: this.intolerance
      })
      .then(() => {
        this.showToast("Updated successfully");
        this.hideLoading();
          
        this.navCtrl.pop();
      })
      .catch(error => {
        this.showToast(error);
        this.hideLoading();
      })
  }
}
