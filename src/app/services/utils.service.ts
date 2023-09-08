import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, LoadingOptions, ToastController, ToastOptions, AlertController, AlertOptions, PopoverController, PopoverOptions } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private router: Router,
    private modalController: ModalController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private popoverController: PopoverController,
  ) { }


  // ================ Save in local storage ======================
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  // ================ Get from local storage ======================
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) as any);
  }

  // ================ Remove from local storage ======================
  removeFromLocalStorage(key: string) {
    return localStorage.removeItem(key)
  }
  // ================ Present popover ======================
  async presentPopover(opts: PopoverOptions) {
    const popover = await this.popoverController.create(opts);

    await popover.present();
  }

  // ============== Dismiss popover ==============
  dismissPopover(data?: any) {
    return this.popoverController.dismiss(data);
  }

  // ================loading======================

   // ========= Present loading ===========
   async presentLoading(opts?: LoadingOptions) {
    return await this.loadingController.create(opts);
  }

  // ================ Present alert ======================
  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertController.create(opts);

    await alert.present();
  }

  // ================ Present toast ======================
  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }


  // ============== Modal ==============
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts);

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      return data;
    }
  }

  // ============== Close modal ==============
  dismissModal(data?: any) {
    return this.modalController.dismiss(data);
  }

  // ============== RouterLink ==============
  routerLink(url: string) {
    return this.router.navigateByUrl(url)
  }

}
