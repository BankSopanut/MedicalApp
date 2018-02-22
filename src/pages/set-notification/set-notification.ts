import { LocalNotifications } from '@ionic-native/local-notifications';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { every } from '@firebase/util';
import BasePage from '../base';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
  selector: 'page-set-notification',
  templateUrl: 'set-notification.html',
})
export class SetNotificationPage extends BasePage {

  date: string;
  time: string;

  movie: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public localNotifications: LocalNotifications,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    super(toastCtrl, loadingCtrl)
    this.movie = this.navParams.get('movie');
  }

  set() {
    let parsedDateTime = Date.parse(this.date + ' ' + this.time);
    let datetime = new Date(parsedDateTime);

    this.localNotifications.schedule({
      id: 1,
      text: 'You have an appointment to watch ' + this.movie.data.name,
      firstAt: datetime,
      every: 'minute'
    })

    this.showToast(JSON.stringify(this.localNotifications.get(1)));

  }

  turnOff() {
    this.localNotifications.cancelAll()
  }

}
