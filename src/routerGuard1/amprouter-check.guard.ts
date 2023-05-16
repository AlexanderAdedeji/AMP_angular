import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Constants } from 'app/Business/tools/constants/constants';
import { StorageService } from 'app/Business/tools/storage/storge-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AMPRouterCheckGuard implements CanActivate {
  userType;
  check:boolean;
  constructor(
    private router: Router,
    public constants: Constants,
    public storageService: StorageService){}
  canActivate()
 {
   this.userType=this.storageService.UserType

   this.check = this.userType.id==this.constants.getAlluserTypes().SUPERUSER?this.allowUser():this.disallowUser();
    return this.check;
  }
    allowUser(){

      return true;
    }
    disallowUser(){
      alert("You are restricted from viewing this page")
      return false;
    }


}
