import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  loading!: boolean;

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }


  // ====== Submit ======
  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.presentLoading({ message: 'Authenticating...' });
      await loading.present();

      this.firebaseSvc.signIn(this.form.value as User).then(async res => {

      
        loading.dismiss();
        let user: User = {
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email,
        }

        this.utilsSvc.saveInLocalStorage('user', user);
        this.utilsSvc.routerLink('/tabs/home')


        this.form.reset();

        this.utilsSvc.presentToast({
          message: `Welcome ${user.name}`,
          duration: 1500,
          color: 'primary',
          icon: 'person-outline'
        })

      }).catch(error => {

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          icon: 'alert-circle-outline'
        })

      }).finally(() => {
        loading.dismiss();
      })
    }
  }


}
