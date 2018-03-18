import { AddContactPage } from './../add-contact/add-contact';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import BasePage from '../base';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { EditContactPage } from '../edit-contact/edit-contact';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage extends BasePage {

  items = [];
  results = [];

  uid: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public callNumber: CallNumber,
    public actionSheetCtrl: ActionSheetController
  ) {
    super(toastCtrl, loadingCtrl);
  }

  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid;

    this.showLoading("กำลังดึงข้อมูล...")
    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .collection('Contacts')
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

  navigateAddcontact() {
    this.navCtrl.push(AddContactPage);
  }

  presentActionSheet(contactID) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'ตัวเลือก',
      buttons: [
        {
          text: 'โทร',
          role: 'destructive',
          handler: () => {
      
          this.callNumber.callNumber("contactTel", true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
          }
        }, {
          text: 'แก้ไข',
          handler: () => {
            this.navCtrl.push(EditContactPage, {
              id: contactID
            });
          }
        }, {
          text: 'ลบผู้ติดต่อ',
          handler: () => {
            this.showLoading("กำลังลบ...")
            this.firebaseFirestore
              .collection('users')
              .doc(this.uid)
              .collection('Contacts')
              .doc(contactID)
              .delete()
              .then(() => {
                this.hideLoading();
                this.showToast("ลบผู้ติดต่อแล้ว");
              })
              .catch(error => {
                this.hideLoading();
                this.showToast(error);
              });
          }
        }, {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
