import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { NewsDetailsComponent } from '../news-details/news-details.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CommentComponent } from '../comment/comment.component';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements OnInit {

  feed;
  comments: any[] = [];
  likes: any[] = [];

  constructor(
    private utilsSvc: UtilsService,
    private firebaseSvc: FirebaseService
  ) { }

  ngOnInit() {
    this.getNews();
  }


  //======= Get user from local storage =======
  user(): User {
    return this.utilsSvc.getFromLocalStorage('user')
  }

  //======= Details of the news =======
  readMore(feed) {
    this.utilsSvc.presentModal({
      component: NewsDetailsComponent,
      cssClass: 'full-size',
      componentProps: { feed }
    })
  }

  //======= Get news from firebase =======
  getNews() {
    this.firebaseSvc.getCollectionData('news').subscribe({
      next: (res: any) => {

        this.feed = res.map(post => {

          this.firebaseSvc.getCollectionData(`news/${post.id}/likes`).subscribe({
            next: (likes: any) => {

              post.likes = likes;
              post.isLiked = post.likes.filter(like => like.uid === this.user()?.uid).length;

            }
          });
          this.firebaseSvc.getCollectionData(`news/${post.id}/comments`).subscribe({
            next: (comments: any) => {

              post.comments = comments;
              

            }
          });

          return post;
        })

      }

    })
  }

  //======= Open the comment section =======
  comment(comment) {
    this.utilsSvc.presentModal({
      component: CommentComponent,
      cssClass: 'full-size',
      componentProps: { comment },
    })
  }

//======= Add or remove like =======
  addOrRemoveLike(post: any){
   if(post.isLiked) this.removeLike(post);
   else this.giveLike(post);
  }

  //======= Give Like =======
  async giveLike(feed) {

    let path = `news/${feed.id}/likes/${this.user().uid}`;

    const loading = await this.utilsSvc.presentLoading();
    await loading.present();
    this.firebaseSvc.setDocument(path, this.user()).then(async res => {

      loading.dismiss();
      this.getNews();

      this.utilsSvc.presentToast({
        message: 'Post liked',
        duration: 1500,
        color: 'primary',
        icon: 'heart'
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

  //======= Remove Like =======
  async removeLike(feed) {

    let path = `news/${feed.id}/likes/${this.user().uid}`;

    const loading = await this.utilsSvc.presentLoading();
    await loading.present();
    this.firebaseSvc.deleteDocument(path).then(async res => {

      loading.dismiss();
      this.getNews();

      this.utilsSvc.presentToast({
        message: 'Like removed',
        duration: 1500,
        color: 'primary',
        icon: 'heart-dislike-outline'
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
