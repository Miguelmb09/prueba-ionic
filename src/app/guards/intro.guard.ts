import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(
    private utilsSvc: UtilsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      let introChecked = localStorage.getItem('introChecked');

      if (!introChecked) {
        this.utilsSvc.routerLink('/intro');
        return false;
      } else {
        return true;
      }
  
  
    }
  
}
