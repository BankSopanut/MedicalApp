import { EditProfilePage } from './../edit-profile/edit-profile';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  name: string = '';
  email: string = '';
  gender: string = '';
  age: number;
  tel: string = '';
  height: number;
  weight: number;
  intolerance: string = '';

  uid: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public FirebaseFirestore: AngularFirestore
  ) {
  }

  ionViewDidLoad() {
    this.email = this.firebaseAuth.auth.currentUser.email;
    this.name = this.firebaseAuth.auth.currentUser.displayName;

    this.uid = this.firebaseAuth.auth.currentUser.uid;

    this.FirebaseFirestore
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
  navigateEdit() {
    this.navCtrl.push(EditProfilePage);
  }
  logout() {
    this.firebaseAuth.auth.signOut();
  }

}