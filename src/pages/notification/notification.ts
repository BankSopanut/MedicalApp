import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AddNotificationPage } from '../add-notification/add-notification';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  notifications = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public notification: LocalNotifications,
    public modalController: ModalController,
    public firebaseFirestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth
  ) {
  }

  ionViewDidEnter() {
    this.firebaseFirestore.collection('users')
      .doc(this.firebaseAuth.auth.currentUser.uid)
      .collection('notification')
      .snapshotChanges()
      .subscribe(data => {
        let items = [];
        data.map(action => {
          items.push({
            dataid: action.payload.doc.id,
            ...action.payload.doc.data()
          })
        });

        this.notifications = items
        console.log(this.notifications);

      });
  }

  showAddNotification() {
    this.modalController.create(AddNotificationPage).present()
  }

  format(data) {
    return moment(data).format("HH:mm");
  }

  async delete(notificationId, dataId) {
    alert(notificationId);

    try {
      await this.notification.cancel(notificationId);
      await this.notification.clear(notificationId);
      const notis = await this.notification.getAll()

      await this.firebaseFirestore.collection('users')
        .doc(this.firebaseAuth.auth.currentUser.uid)
        .collection('notification')
        .doc(dataId)
        .delete()

      alert(JSON.stringify("ลบการแจ้งเตือนแล้ว"))

    } catch (error) {
      alert(JSON.stringify(error))
    }
  }
}
