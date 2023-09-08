import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { IonicModule } from '@ionic/angular';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { CommentComponent } from './components/comment/comment.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';



@NgModule({
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderComponent,
    CustomInputComponent,
    NewsCardComponent,
    NewsDetailsComponent,
    CommentComponent,
    DateAgoPipe
  ],
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    NewsCardComponent,
    NewsDetailsComponent,
    CommentComponent,
    DateAgoPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
  ],
})
export class SharedModule { }
