import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import BasePage from '../base';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BasePage{

  email = '';
  password = '';

  constructor(
    public navCtrl: NavController,
    public LoadingCtrl: LoadingController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public toastCtrl: ToastController
  ) {
    super(toastCtrl, LoadingCtrl)
  }

  login() {
    this.showLoading("Logging in...");
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        this.hideLoading()
      })
      .catch((error) => {
        this.hideLoading()
        this.showToast(error.message);
      })
  }

  navigateRegister(){
    this.navCtrl.push(RegisterPage)
  }
}
