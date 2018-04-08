import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FirebaseAuth } from '@firebase/auth-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import BasePage from '../base';

@Component({
  selector: 'page-doctor',
  templateUrl: 'doctor.html',
})
export class DoctorPage extends BasePage {

  email = '';
  password = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    super(toastCtrl, loadingCtrl)
  }

}
