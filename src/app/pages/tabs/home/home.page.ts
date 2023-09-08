import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  feed = [
    {title:'Balon d or',
    description:'Nominados al prox balon de oro.',
    img:'/assets/icon/avatar.svg',
    section:'Football',
    likes:[],
    comments:[],
  },
  
  ]

  constructor() { }

  ngOnInit() {
   
  }

}
