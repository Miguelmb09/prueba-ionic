import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkMode = new BehaviorSubject(false);

  constructor(
    private utilsSvc: UtilsService
  ) { }

  
   // If the user has previously selected a theme, then set the theme to the user's preference.
   // Otherwise, set the theme to light mode

   
    setInitialTheme() {
      let darkMode = JSON.parse(this.utilsSvc.getFromLocalStorage('darkMode')) 
     
      if (darkMode) {
       this.setTheme(darkMode)
      } else {
       this.setTheme(darkMode)
      }  
    }
  

  setTheme(darkMode:boolean) { 
    if (darkMode) {
      document.body.setAttribute('color-theme', 'dark');    
    } else {
      document.body.setAttribute('color-theme', 'light');   
    }  
   
    this.darkMode.next(darkMode);   
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }

}

