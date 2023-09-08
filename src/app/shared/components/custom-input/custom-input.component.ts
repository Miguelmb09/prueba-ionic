import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements OnInit {

  @Input() control!: FormControl;
  @Input() autocomplete!: string;
  @Input() type!: string;
  @Input() label!: string;
  @Input() icon!: string;
  @Input() iconSrc!: string;
  @Input() min!: string;
  @Input() max!: string;

  isPassword!: boolean;
  hide: boolean = true;

  constructor() { }

  ngOnInit() {

    if (this.type == 'password') {
      this.isPassword = true;
    }

  }


  // ========= Password Input ==========
  showOrHidePassword() {
    this.hide = !this.hide

    if (this.hide) {
      this.type = 'password'
    } else {
      this.type = 'text'
    }
  }
}