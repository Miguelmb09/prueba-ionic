import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  @Input() comment;

  message = new FormControl('', Validators.required)
  comments: any[] = [];

  constructor(
    private utilsSvc: UtilsService,
    private firebaseSvc: FirebaseService
  ) { }

  ngOnInit() {
   this.getComments();
  }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user')
  }


 //======= Get comments from firebase =======
 getComments() {
  let path = `news/${this.comment.id}/comments`;

  this.firebaseSvc.getCollectionData(path).subscribe({
    next: (res: any) => {
      this.comments = res;
 
    }
  })
}



//======= Create Comment =======
  async newComment() {

    let path = `news/${this.comment.id}/comments`;

    let comment = {
      user: this.user(),
      comment: this.message.value,
      date: this.firebaseSvc.firebaseCurrentDate()
    }

    const loading = await this.utilsSvc.presentLoading();
    await loading.present();
    this.firebaseSvc.addDocument(path, comment).then(async res => {

      loading.dismiss();

      this.message.reset();

      this.utilsSvc.presentToast({
        message: 'Comment submitted',
        duration: 1500,
        color: 'primary',
        icon: 'checkmark-circle-outline'
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
