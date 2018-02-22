import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import BasePage from '../base';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BasePage {

  email: string = '';
  password: string = '';
  displayName: string = '';
  age: number;
  tel: string = '';

  loader: Loading;

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
    this.showLoading("Registering...")
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        user.updateProfile({
          displayName: this.displayName,
          photoURL: 'http://1077thejewel.com/wp-content/uploads/robert-downey-jr-1.jpg'
        })

        this.firebaseFirestore
          .collection('users')
          .doc(user.uid)
          .set({
            name: this.displayName,
            email: this.email,
            tel: this.tel,
            age: this.age
          })

        this.hideLoading();
      })
      .catch(error => {
        this.hideLoading();
        this.showToast(error.message);
      })
  }

}
