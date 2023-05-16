import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncodeAESService } from 'app/Business/AES/aes';
import { AlertService } from 'app/Business/tools/alert/alert.service';
import { Constants } from 'app/Business/tools/constants/constants';
import { StorageService } from 'app/Business/tools/storage/storge-service.service';
import { AgentsService } from 'app/Services/Agents/agents.service';
import { AuthService } from 'app/Services/AuthService/auth.service';

import { LoaderService } from 'app/Services/loader/loader.service';
import { UserTypesService } from 'app/Services/UserTypes/userTypes.service';

@Component({
  selector: "app-user-full-details",
  templateUrl: "./user-full-details.component.html",
  styleUrls: ["./user-full-details.component.css"],
})
export class UserFullDetailsComponent implements OnInit {
  user_id;
  user;
  constructor(
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private authService: AuthService,

    public constants: Constants,
    public loaderService: LoaderService,
    public encodeAESService: EncodeAESService,
    public alertService: AlertService
  ) {
    this.user_id = JSON.parse(sessionStorage.getItem("user_id"));
    this.GetUserFullDetails(this.user_id);
  }

  ngOnInit(): void {}

  activateUser(id) {
    let path = "activate";
    this.connectToService(id, path);
  }

  deactivateUser(id) {
    let path = "Deactivate";
    this.connectToService(id, path);
  }

  connectToService(user, connect) {
    let value = {
      token: "",
      userId: user.id,
    };
    value.token = "Token " + JSON.parse(sessionStorage.getItem("user")).token;
    const newValue = this.encodeAESService.encryptData(value);
    this.loaderService.show();
    if (connect == "activate") {
      this.authService.activateUser(newValue).subscribe((res: any) => {
        var response = JSON.parse(res.response);
        if (res.status != 200 && res.status != 0) {
          if (
            response.errors[0].msg != undefined ||
            response.errors[0].msg != null
          )
            this.alertService.basicAlert(
              "Error",
              response.errors[0].msg,
              "error"
            );
          if (
            response.errors[0].message != undefined ||
            response.errors[0].message != null
          )
            this.alertService.basicAlert(
              "Error",
              response.errors[0].message,
              "error"
            );

          this.loaderService.hide();

          return;
        }
        if (res.status == 200) {
          var response = JSON.parse(res.response);
          this.storageService.AllAgentUsersData = response;
          this.alertService.basicAlert(
            user.first_name + " " + user.last_name + " Activated SuccessFull"
          );
          this.loaderService.hide();
        } else {
          this.alertService.basicAlert(
            "Error",
            response.errors[0].message,
            "info"
          );
          this.loaderService.hide();
        }
      });
    } else if (connect == "Deactivate") {
      this.authService.DeactivateUser(newValue).subscribe((res: any) => {
        var response = JSON.parse(res.response);
        if (res.status != 200 && res.status != 0) {
          if (
            response.errors[0].msg != undefined ||
            response.errors[0].msg != null
          )
            this.alertService.basicAlert(
              "Error",
              response.errors[0].msg,
              "error"
            );
          if (
            response.errors[0].message != undefined ||
            response.errors[0].message != null
          )
            this.alertService.basicAlert(
              "Error",
              response.errors[0].message,
              "error"
            );
          this.loaderService.hide();

          return;
        }
        if (res.status == 200) {
          var response = JSON.parse(res.response);
          this.storageService.AllAgentUsersData = response;
          this.alertService.basicAlert(
            user.first_name + " " + user.last_name + " Deactivated SuccessFull"
          );
          this.loaderService.hide();
        } else {
          this.alertService.basicAlert(
            "Error",
            response.errors[0].message,
            "info"
          );
          this.loaderService.hide();
        }
      });
    }
  }

  GetUserFullDetails(userId) {
    let value = {
      token: "",
      user_id: userId,
    };
    // value.token = this.storageService.token;
    value.token = "Token " + JSON.parse(sessionStorage.getItem("user")).token;
    const newValue = this.encodeAESService.encryptData(value);
    this.loaderService.show();
    // this.agentsService.getAgentFullDetails(newValue)
    this.authService.getSingleUser(newValue).subscribe((res: any) => {
      var response = JSON.parse(res.response);
      if (res.status != 200 && res.status != 0) {
        if (
          response.errors[0].msg != undefined ||
          response.errors[0].msg != null
        )
          this.alertService.basicAlert(
            "Error",
            response.errors[0].msg,
            "error"
          );
        if (
          response.errors[0].message != undefined ||
          response.errors[0].message != null
        )
          this.alertService.basicAlert(
            "Error",
            response.errors[0].message,
            "error"
          );
        this.loaderService.hide();

        return;
      }
      if (res.status == 200) {
        var response = JSON.parse(res.response);
        // this.storageService.FullAgentsDetails= response;
        this.loaderService.hide();
        this.user = response;
      } else {
        this.alertService.basicAlert(
          "Error",
          response.errors[0].message,
          "info"
        );
        this.loaderService.hide();
      }
    });
  }
}
