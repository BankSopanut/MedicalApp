import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html',
})
export class AddContactPage {

  name: string;
  tel: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore
  ) {
  }

  create() {
    this.firebaseFirestore
    .collection('users')
    .doc(this.firebaseAuth.auth.currentUser.uid)
    .collection('Contacts')
    .add({
      name : this.name,
      tel : this.tel,
    })
    .then(() => {
      this.navCtrl.pop();
    })
  }

}
