import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import BasePage from '../base';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BasePage {

  name: string;
  email: string;
  password: string;
  gender: string;
  age: number;
  tel: string;
  height: number;
  weight: number;
  intolerance: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public LoadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    super(toastCtrl, LoadingCtrl)
  }

  register() {
    this.showLoading("กำลังลงทะเบียน...")
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        user.updateProfile({
          name: this.name,
          tel: this.tel,
          age: this.age,
          gender: this.gender,
          height: this.height,
          weight: this.weight,
          intolerance: this.intolerance
        })

        this.firebaseFirestore
          .collection('users')
          .doc(user.uid)
          .set({
            name: this.name,
            email: this.email,
            tel: this.tel,
            age: this.age,
            gender: this.gender,
            height: this.height,
            weight: this.weight,
            intolerance: this.intolerance
          })

        this.hideLoading();
      })
      .catch(error => {
        this.hideLoading();
        this.showToast(error.message);
      })
  }

}