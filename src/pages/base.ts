import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { LoadingController } from "ionic-angular/components/loading/loading-controller";
import { Loading } from "ionic-angular/components/loading/loading";

export default abstract class BasePage {

    loader: Loading;

    constructor(
        public toastCtrl: ToastController,
        public LoadingCtrl: LoadingController
    ) { }

    showToast(msg) {
        this.toastCtrl.create({
            message: msg,
            duration: 3000
        })
            .present();
    }

    showLoading(msg) {
        this.loader = this.LoadingCtrl.create({ content: msg })
        this.loader.present();
    }

    hideLoading() {
        this.loader.dismiss();
    }
}