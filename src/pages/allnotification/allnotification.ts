import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-allnotification',
  templateUrl: 'allnotification.html',
})
export class AllnotificationPage {

  items = [];
  results = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllnotificationPage');
  }

}
