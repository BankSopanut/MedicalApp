import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { AddMedicinePage } from './../add-medicine/add-medicine';
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

  barcode: string;

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
    this.barcode = this.navParams.get('barcode');
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

  getItemsFromCode(barcode) {

    if (barcode == '') {
      this.results = this.items;
    }

    if (barcode && barcode.trim() != '') {
      this.results = this.items.filter((item) => {
        return (item.data.barcode.toLowerCase().indexOf(barcode.toLowerCase()) > -1);
      })
    }
  }

  voiceSearch(voice) {
    // Check feature available
    this.speechRecognition.isRecognitionAvailable()
      .then((available: boolean) => console.log(available))

    // Start the recognition process
    this.speechRecognition.startListening(options)
      .subscribe(
        (matches: Array<string>) => console.log(matches),
        (onerror) => console.log('error:', onerror)
      )

    // Stop the recognition process (iOS only)
    this.speechRecognition.stopListening()

    // Get the list of supported languages
    this.speechRecognition.getSupportedLanguages()
      .then(
        (languages: Array<string>) => console.log(languages),
        (error) => console.log(error)
      )

    // Check permission
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => console.log(hasPermission))

    // Request permissions
    this.speechRecognition.requestPermission()
      .then(
        () => console.log('Granted'),
        () => console.log('Denied')
      )
  }

  medData(medicineID) {
    this.navCtrl.push(MedicinePage, {
      id: medicineID
    });
  }

}