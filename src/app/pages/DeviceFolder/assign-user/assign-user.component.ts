import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncodeAESService } from 'app/Business/AES/aes';
import { FormMatters } from 'app/Business/formMatters/formMatters';
import { AlertService } from 'app/Business/tools/alert/alert.service';
import { Constants } from 'app/Business/tools/constants/constants';
import { StorageService } from 'app/Business/tools/storage/storge-service.service';
import { AuthService } from 'app/Services/AuthService/auth.service';
import { AgentsService } from 'app/Services/Agents/agents.service';
import { DevicesService } from 'app/Services/Devices/devices.service';
import { LoaderService } from 'app/Services/loader/loader.service';
import { AllDevicesComponent } from '../all-devices/all-devices.component';

@Component({
  selector: "app-assign-user",
  templateUrl: "./assign-user.component.html",
  styleUrls: ["./assign-user.component.css"],
})
export class AssignUserComponent implements OnInit {
  AllAgentsData;
  AgentEmployees;
  createDevice = true;
  agent_id;
  AllDevice: boolean;
  AssigneEmployeeToDeviceForm: FormGroup;
  errorMessage = "";
  validationMessages;
  unAssignedUsers = [];
  Device;
  userType;
  isSuperUser;

  constructor(
    private authService: AuthService,
    private agentsService: AgentsService,
    private devicesService: DevicesService,
    private router: Router,
    public FValidations: FormMatters,
    public constants: Constants,
    public storageService: StorageService,
    public loaderService: LoaderService,
    public encodeAESService: EncodeAESService,
    public alertService: AlertService
  ) {
    this.GetAgentFullDetails();
    this.GetSingleDevice();
    this.getCurrentUserType();

  }

  ngOnInit(): void {
    this.AssigneEmployeeToDeviceForm =
      this.FValidations.assignEmployeeToDeviceMethod();
    this.validationMessages = this.constants.forErrorMessages();
    this.GetAgentFullDetails();
  }

  getCurrentUserType() {
    this.userType = JSON.parse(sessionStorage.getItem("user")).user_type.name;
    this.userType === "SUPERUSER"
      ? (this.isSuperUser = true)
      : (this.isSuperUser = false);
  }

  AllDevices() {
    this.router.navigate(["AMP/alldevices"]);
  }

  ///////////////////////////////////
  /** Get all contants  */
  getAllConstants() {
    this.constants = new Constants();
  }

  GetDevice() {
    this.Device = this.storageService.Device;
  }


  GetUnAssignedEmployees() {

    const assigned_users = this.storageService.Device.assigned_users;
    const agent_officers =
      this.storageService.FullAgentsDetails.employees.filter(
        (AgentEmployee) => AgentEmployee.user_type.name == "AGENT_OFFICER"
      );
    const assignedUsersEmail = assigned_users.map(
      (assigned_user) => assigned_user.email
    );
    for (let i = 0; i < agent_officers.length; i++) {
      if (!assignedUsersEmail.includes(agent_officers[i].email)) {
        this.unAssignedUsers.push(agent_officers[i]);
      }
    }

  }

  Cancel() {
    if (this.isSuperUser) this.router.navigate(["AMP/agentdetails"]);
    else this.router.navigate(["AMP/alldevices"]);
  }

  AssigneEmployeeToDevice(value) {
    value.device_id = this.Device.id;
    value.token = "Token " + JSON.parse(sessionStorage.getItem("user")).token;

    const newValue = this.encodeAESService.encryptData(value);
    this.loaderService.show();
    this.devicesService
      .assignDevicetoAgentEmployees(newValue)
      .subscribe((res: any) => {
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

          this.alertService.basicAlert("Officer Assigned Successfully");
          this.GetAgentFullDetails();
          this.GetSingleDevice();
          this.loaderService.hide();
          this.Cancel();
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

  GetAgentFullDetails() {
    let value = {
      token: "",
      agent_id: JSON.parse(sessionStorage.getItem("id")),
    };

    value.token = "Token " + JSON.parse(sessionStorage.getItem("user")).token;

    const newValue = this.encodeAESService.encryptData(value);
    this.loaderService.show();
    this.agentsService.getAgentFullDetails(newValue).subscribe((res: any) => {
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
     
        this.storageService.FullAgentsDetails = response;
        this.getAllConstants();

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

  GetSingleDevice() {
    let value = {
      token: "",
      device_id: JSON.parse(sessionStorage.getItem("device_id")),
    };
    value.token = "Token " + JSON.parse(sessionStorage.getItem("user")).token;
    const newValue = this.encodeAESService.encryptData(value);
    this.loaderService.show();
    this.devicesService.getSingleDevice(newValue).subscribe((res: any) => {
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
        this.storageService.Device = response;
        this.GetUnAssignedEmployees();
        this.GetDevice();
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
