import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  animate: boolean;

  constructor(private utilsSvc: UtilsService) { }

  ngOnInit() {
    setInterval(() => {
      this.animate = !this.animate
    }, 1000);
  }

  getStarted() {
    localStorage.setItem('introChecked', 'true');
    this.utilsSvc.routerLink('/auth')
  }

}
