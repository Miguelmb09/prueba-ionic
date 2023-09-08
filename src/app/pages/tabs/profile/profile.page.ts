import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  darkMode!: BehaviorSubject<boolean>;

  user = {} as User

  constructor(
    private themeSvc: ThemeService,
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {
    this.darkMode = this.themeSvc.darkMode;
  }

  ionViewWillEnter() {
    this.getUser();
  }

  // ====== Set color theme ======
  setTheme(darkMode: boolean) {
    this.themeSvc.setTheme(darkMode);
  }

  getUser() {
    return this.user = this.utilsSvc.getFromLocalStorage('user')
  }


   // ====== Log out ======
   signOut() {
    this.utilsSvc.presentAlert({
      header: 'Sign Out',
      message: 'Are you sure you want to log out?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',

        }, {
          text: 'Confirm',
          handler: () => {
            this.firebaseSvc.signOut();
          }
        }
      ]
    });
  }

}
