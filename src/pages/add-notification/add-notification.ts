import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
@Component({
  selector: 'page-add-notification',
  templateUrl: 'add-notification.html',
})
export class AddNotificationPage {

  public time;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public notification: LocalNotifications,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
  ) {
  }

  add() {
    const t = moment(this.time, "HH:mm");
    const id = Math.floor(Math.random() * 9999);

    this.notification.schedule({
      id: id,
      text: 'ได้เวลาทานยาแล้ววว',
      firstAt: new Date(t.year(), t.month(), t.date(), t.hour(), t.minute()),
      every: 'date'
    });

    console.log(id);

    this.firebaseFirestore
      .collection('users')
      .doc(this.firebaseAuth.auth.currentUser.uid)
      .collection('notification')
      .add({
        id: id,
        time: t.format()
      })

    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotificationPage');
  }

}
