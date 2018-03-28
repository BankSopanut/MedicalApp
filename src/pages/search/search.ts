import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { MedicinePage } from './../medicine/medicine';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import BasePage from '../base';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage extends BasePage {

  code: string;

  items = [];
  results = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public speechRecognition: SpeechRecognition
  ) {
    super(toastCtrl, loadingCtrl)
    this.code = this.navParams.get('code');
  }

  ionViewDidLoad() {

    this.showLoading("กำลังดึงข้อมูล...")
    this.firebaseFirestore
      .collection('Medicines')
      .snapshotChanges()
      .subscribe(data => {
        this.items = [];

        data.map(action => {
          this.items.push({
            id: action.payload.doc.id,
            data: action.payload.doc.data()
          })
        });

        this.results = this.items;

        this.hideLoading();
        this.getItemsFromCode(this.code)
      },
        (error) => {
          this.hideLoading();
          this.showToast(error);
        })
  }

  getItems(event) {
    let val = event.target.value;

    if (val == '') {
      this.results = this.items;
    }

    if (val && val.trim() != '') {
      this.results = this.items.filter((item) => {
        return (item.data.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  getItemsFromCode(code) {

    if (code == '') {
      this.results = this.items;
    }

    if (code && code.trim() != '') {
      this.results = this.items.filter((item) => {
        if (item.data.barcode) {
          return (item.data.barcode.indexOf(code) > -1);
        }
      });
    }
  }

  medData(medicineID) {
    this.navCtrl.push(MedicinePage, {
      id: medicineID
    });
  }

}