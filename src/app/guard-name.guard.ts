import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AlertService } from "./Business/tools/alert/alert.service";
import { Constants } from "./Business/tools/constants/constants";
import { StorageService } from "./Business/tools/storage/storge-service.service";

@Injectable({
  providedIn: "root",
})
export class GuardNameGuard implements CanActivate {
  /**
   *
   */
  constructor(
    private router: Router,
    public constants: Constants,
    public storageService: StorageService,
    public alertService: AlertService
  ) {}
  canActivate() {
    if (this.storageService.token !== undefined) {
      let res = this.retainPage();
      return res;
    } else {
      this.goToLogin();
    }
  }

  retainPage() {
    return true;
  }

  goToLogin() {
    this.router.navigate([""]);
    return false;

    // let result: any = this.alertService.confirmAlert(
    //   "Caution",
    //   "You are about to be logged out. Are you sure about this?"
    // ).then((result) => {
    //   // dismiss: "cancel"
    //   // isConfirmed: false
    //   // isDismissed: true
    // if (result.isConfirmed) {
    //   this.router.navigate([""]);
    // } else {
    //   return true;
    // }
    // })
  }
}
