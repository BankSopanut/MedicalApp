import { LocalNotifications } from '@ionic-native/local-notifications';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import * as moment from 'moment';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  notifyTime: any;
  notifications: any[] = [];
  days: any[];
  chosenHours: number;
  chosenMinutes: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController,
    public localNotifications: LocalNotifications
  ) {
    this.notifyTime = moment(new Date()).format();

    this.chosenHours = new Date().getHours();
    this.chosenMinutes = new Date().getMinutes();

    this.days = [
      { title: 'จันทร์', dayCode: 1, checked: false },
      { title: 'อังคาร', dayCode: 2, checked: false },
      { title: 'พุธ', dayCode: 3, checked: false },
      { title: 'พฤหัสบดี', dayCode: 4, checked: false },
      { title: 'ศุกร์', dayCode: 5, checked: false },
      { title: 'เสาร์', dayCode: 6, checked: false },
      { title: 'อาทิตย์', dayCode: 0, checked: false }
    ];

  }

  ionViewDidLoad() {

  }

  timeChange(time) {
    this.chosenHours = time.hour.value;
    this.chosenMinutes = time.minute.value;
  }

  addNotifications() {
    let currentDate = new Date();
    let currentDay = currentDate.getDay(); //sunday = 0, Monday = 1, etc.

    for (let day of this.days) {

      if (day.checked) {

        let firstNotificationTime = new Date();
        let dayDifference = day.dayCode - currentDay;

        if (dayDifference < 0) {
          dayDifference = dayDifference + 7; //for case where the day is in the following week
        }

        firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
        firstNotificationTime.setHours(this.chosenHours);
        firstNotificationTime.setMinutes(this.chosenMinutes);

        let notification = {
          id: day.dayCode,
          title: 'ทานยา',
          text: 'ถึงเวลาทานยาของคุณแล้ว :)',
          at: firstNotificationTime,
          every: 'week'
        };

        this.notifications.push(notification);
      }
    }
    console.log("Notification to be scheduled: ", this.notifications);

    if (this.platform.is('cordova')) {

      //cancel any existing notifications
      this.localNotifications.cancelAll().then(() => {

        //schedule the new notifications
        this.notifications = [];

        let alert = this.alertCtrl.create({
          title: 'ตั้งค่าการแจ้งเตือนแล้ว',
          buttons: ['เรียบร้อย']
        });

        alert.present();
      });
    }
  }

  cancelAll() {
    this.localNotifications.cancelAll();

    let alert = this.alertCtrl.create({
      title: 'ยกเลิกการแจ้งเตือนแล้ว',
      buttons: ['เรียบร้อย']
    });

    alert.present();
  }

}
