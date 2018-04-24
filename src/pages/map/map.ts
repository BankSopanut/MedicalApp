import { LoadingController } from "ionic-angular/components/loading/loading-controller";
import { Loading } from "ionic-angular/components/loading/loading";
import { Component, ViewChild, NgZone } from "@angular/core";
import { NavController, NavParams, ActionSheetController, Platform, ModalController } from "ionic-angular";
import { CallNumber } from "@ionic-native/call-number";
import { Geolocation } from "@ionic-native/geolocation";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from "@ionic-native/google-maps";

declare var google;

@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class MapPage {
  @ViewChild("map") private mapElement;
  @ViewChild("web_map") private webMapElement;

  private map: any;

  private view: string = "map";
  public pharmacys: any;

  private loader: Loading;

  private googlePlaceService;
  private googleDistanceMatrix;
  private googleAutoComplete;

  private autoComplete = { input: '' };
  private autoCompleteItems = [];


  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public googleMaps: GoogleMaps,
    public phone: CallNumber,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public modalCtrl: ModalController,
    public zone: NgZone
  ) { }

  ionViewDidLoad() {

    let webMap = new google.maps.Map(this.webMapElement.nativeElement);
    this.googlePlaceService = new google.maps.places.PlacesService(webMap);
    this.googleDistanceMatrix = new google.maps.DistanceMatrixService();
    this.googleAutoComplete = new google.maps.places.AutocompleteService();

    this.loadMap();
  }

  async loadMap() {
    this.showLoading("กำลังเตรียมแผนที่...");
    let geoResult = await this.geolocation.getCurrentPosition()

    let lat = geoResult.coords.latitude;
    let lng = geoResult.coords.longitude;

    this.map = this.googleMaps.create(this.mapElement.nativeElement);
    this.map.setMyLocationEnabled(true);

    await this.map.one(GoogleMapsEvent.MAP_READY);

    this.hideLoading();

    let currentLocation = new google.maps.LatLng(lat, lng);
    let nearyByRequest = {
      location: currentLocation,
      radius: "5000",
      type: ["pharmacy"]
    };

    this.map.moveCamera({
      target: currentLocation,
      zoom: 13
    });

    this.googlePlaceService.nearbySearch(nearyByRequest, (result, status) => {

      result.map(async pharmacy => {
        let pharmacyLatLng = new google.maps.LatLng(
          pharmacy.geometry.location.lat(),
          pharmacy.geometry.location.lng()
        );

        /* Request distance and duration */
        let distanceRequest = {
          origins: [currentLocation],
          destinations: [pharmacyLatLng],
          travelMode: "DRIVING"
        };
        this.googleDistanceMatrix.getDistanceMatrix(distanceRequest, response => {
          pharmacy.distance = response.rows[0].elements[0].distance.text;
          pharmacy.duration = response.rows[0].elements[0].duration.text;
        }
        );

        /* Request place detail for phone number */
        let placeDetailRequest = { placeId: pharmacy.place_id };
        this.googlePlaceService.getDetails(placeDetailRequest, (place, status) => {
          if (status === 'OK') pharmacy.phoneNumber = place.international_phone_number;
        });

        /* Add each pharmacy to marker and show actionsheet when cliked*/
        let marker = await this.map.addMarker({
          title: pharmacy.name,
          icon: "red",
          label: "H",
          animation: "BOUNCE",
          position: {
            lat: pharmacy.geometry.location.lat(),
            lng: pharmacy.geometry.location.lng()
          }
        })
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          this.showActionSheet(pharmacy.phoneNumber);
        });

        this.pharmacys = result;

      });
    });
  }

  callNumber(number: string) {
    this.phone
      .callNumber(number, true)
      .then(() => console.log("Launched dialer!"))
      .catch(() => console.log("Error launching dialer"));
  }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message: message,
        duration: 3000
      })
      .present();
  }

  showLoading(message: string) {
    this.loader = this.loadingCtrl.create({
      content: message
    });

    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }

  showActionSheet(data) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'ตัวเลือก',
      buttons: [
        {
          text: 'โทรติดต่อ',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'call' : null,
          handler: () => {
            this.callNumber(data);
          }
        },
      ]
    });
    actionSheet.present();
  }

  updateSearchResults() {
    if (this.autoComplete.input == '') {
      this.autoCompleteItems = [];
      return;
    }

    this.googleAutoComplete.getPlacePredictions({ input: this.autoComplete.input }, (predictions, status) => {
      this.autoCompleteItems = [];

      this.zone.run(() => {
        predictions.forEach(async (prediction) => {
          this.autoCompleteItems.push(prediction);
          this.pharmacys = [];

          /* Request distance and duration */
          // let distanceRequest = {
          //   origins: [currentLocation],
          //   destinations: [pharmacyLatLng],
          //   travelMode: "DRIVING"
          // };
          // this.googleDistanceMatrix.getDistanceMatrix(distanceRequest, response => {
          //   pharmacy.distance = response.rows[0].elements[0].distance.text;
          //   pharmacy.duration = response.rows[0].elements[0].duration.text;
          // });

          /* Request place detail for phone number */
          let placeDetailRequest = { placeId: prediction.place_id };
          this.googlePlaceService.getDetails(placeDetailRequest, (place, status) => {
            if (status === 'OK') prediction.phoneNumber = place.international_phone_number;
          });

          /* Add each pharmacy to marker and show actionsheet when cliked*/
          let marker = await this.map.addMarker({
            title: prediction.name,
            icon: "red",
            label: "H",
            animation: "BOUNCE",
            position: {
              lat: prediction.geometry.location.lat(),
              lng: prediction.geometry.location.lng()
            }
          })

          this.map.
            marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
              this.showActionSheet(prediction.phoneNumber);
            });

          this.pharmacys = prediction;

        });

      });
    });
  }

}
