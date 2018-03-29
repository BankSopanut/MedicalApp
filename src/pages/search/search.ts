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

  showAllItems() {
    this.results = this.items;
  }

  getItems(event) {
    let val = event.target.value;

    if (val == '') {
      this.results = this.items;
    }

    if (val && val.trim() != '') {
      this.results = this.items.filter((item) => {
        let found_name = item.data.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
        let found_cure = item.data.cure.toLowerCase().indexOf(val.toLowerCase()) > -1;
        let found_barcode = false;
        if (item.data.barcode) {
          found_barcode = item.data.barcode.indexOf(val.toLowerCase()) > -1;
        }
        return found_name || found_cure || found_barcode;
      });
    }
  }

  getItemsFromCode(code) {

    if (code == '') {
      this.results = this.items;
    }

    if (code && code.trim() != '') {
      this.results = this.items.filter((item) => {
        let found_name = item.data.name.toLowerCase().indexOf(code.toLowerCase()) > -1;
        let found_cure = item.data.cure.toLowerCase().indexOf(code.toLowerCase()) > -1;
        let found_barcode = false;
        if (item.data.barcode) {
          found_barcode = item.data.barcode.indexOf(code.toLowerCase()) > -1;
        }
        return found_name || found_cure || found_barcode;
      });
    }
  }

  listening() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });

    let options = {
      language: 'th-TH'
    }
    this.speechRecognition.startListening(options).subscribe(voiceData => {
      // this.showToast(voiceData.tostring())
      if (voiceData) {
        this.code = voiceData[0]
        this.getItemsFromCode(this.code)
      }
    }, (err) => {
      this.showToast('ลองใหม่อีกครั้ง');
    });
  }

  medData(medicineID) {
    this.navCtrl.push(MedicinePage, {
      id: medicineID
    });
  }

}