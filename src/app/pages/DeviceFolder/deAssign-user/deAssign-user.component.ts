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
  selector: 'app-deAssign-user',
  templateUrl: './deAssign-user.component.html',
  styleUrls: ['./deAssign-user.component.css']
})
export class DeAssignUserComponent implements OnInit {

  AllAgentsData;
  AgentEmployees
  AllDevice
  unAssigneEmployeeFromDeviceForm: FormGroup;
  errorMessage = '';
  validationMessages;
  Device;
  assigned_users;
  AssignedUsers=[];
  userType;
  isSuperUser;

  //assignedUsersEmail;



  constructor(private authService: AuthService,
    private agentsService: AgentsService,
    private devicesService: DevicesService,
    private formBuilder: FormBuilder,
    private router: Router,
    public FValidations: FormMatters,
    public constants: Constants,
    public storageService: StorageService,
    public loaderService: LoaderService,
    public encodeAESService: EncodeAESService,
    public alertService: AlertService) { 


      this.GetAgentFullDetails();
      this. GetSingleDevice();
      this.getCurrentUserType();
    

    }

  ngOnInit(): void {
    this.unAssigneEmployeeFromDeviceForm = this.FValidations.assignEmployeeToDeviceMethod();
    this.validationMessages = this.constants.forErrorMessages();
    this.GetAgentFullDetails();
  }



  getCurrentUserType(){

    this.userType = JSON.parse(sessionStorage.getItem('user')).user_type.name
    this.userType === 'SUPERUSER'? this.isSuperUser = true : this.isSuperUser = false
    
  }


  ///////////////////////////////////
   /** Get all contants  */
   getAllConstants() {
    this.constants = new Constants();
  }



  GetDevice(){
    this.Device= this.storageService.Device

  }

   GetAssignedEmployees() {
    this.assigned_users=   this.storageService.Device.assigned_users;   
    const assignedUsersEmail=this.assigned_users.map(assigned_user => assigned_user.email)
   this.AgentEmployees = this.storageService.FullAgentsDetails.employees 
    for(let i=0; i < this. AgentEmployees.length; i++){
      if(assignedUsersEmail.includes(this. AgentEmployees[i].email)){
        this.AssignedUsers.push(this.AgentEmployees[i])
      }
    }
    }


    AllDevices(){
    this.router.navigate(["AMP/alldevices"])
  }
    

    unAssigneEmployeeFromDevice(value) {

     value.device_id=this.Device.id;
      value.token = 'Token ' + JSON.parse(sessionStorage.getItem('user')).token;
      const newValue = this.encodeAESService.encryptData(value);
      this.loaderService.show();
      this.devicesService.unAssignAgentEmployeesFromDevice(newValue)
          .subscribe((res: any) => {
            var response = JSON.parse(res.response);
            if (res.status != 200 && res.status != 0) {
              
              if(response.errors[0].msg != undefined || response.errors[0].msg != null)this.alertService.basicAlert("Error", response.errors[0].msg, 'error');
              if(response.errors[0].message != undefined || response.errors[0].message != null)this.alertService.basicAlert("Error", response.errors[0].message, 'error');
              this.loaderService.hide();
    
              return;
            }
            if (res.status == 200) {
              var response = JSON.parse(res.response);
              this.alertService.basicAlert("Officer was UnAssigned Successfully");
              this.GetAgentFullDetails();
              this. GetSingleDevice();
              this.Cancel();
              this.loaderService.hide();

    
            } else {
              this.alertService.basicAlert("Error", response.errors[0].message, 'info');
              this.loaderService.hide();
    
            }
    
    
          })
      
    }


    Cancel(){

      if(this.isSuperUser)this.router.navigate(['AMP/agentdetails'])
      else this.router.navigate(['AMP/alldevices'])
    }


    GetAgentFullDetails(){
      let value = {
        token : '',
        agent_id: JSON.parse(sessionStorage.getItem('id'))
      };
      value.token = 'Token ' + JSON.parse(sessionStorage.getItem('user')).token;
      const newValue = this.encodeAESService.encryptData(value)
      this.loaderService.show();
      this.agentsService.getAgentFullDetails(newValue)
        .subscribe((res: any) => {
        
          var response = JSON.parse(res.response);
          if (res.status != 200 && res.status != 0) {
           
            if(response.errors[0].msg != undefined || response.errors[0].msg != null)this.alertService.basicAlert("Error", response.errors[0].msg, 'error');
            if(response.errors[0].message != undefined || response.errors[0].message != null)this.alertService.basicAlert("Error", response.errors[0].message, 'error');
            this.loaderService.hide();
    
            return;
          }
          if (res.status == 200) {
            var response = JSON.parse(res.response);
            this.storageService.FullAgentsDetails= response;
            this.getAllConstants(); 
            this.loaderService.hide();
    
          } else {
            this.alertService.basicAlert("Error", response.errors[0].message, 'info');
            this.loaderService.hide();
    
          }
    
    
        })
    
    }




    GetSingleDevice(){
      let value = {
        token : '',
        device_id: JSON.parse(sessionStorage.getItem('device_id'))
      };

      value.token = 'Token ' + JSON.parse(sessionStorage.getItem('user')).token;
      const newValue = this.encodeAESService.encryptData(value)
      this.loaderService.show();
      this.devicesService.getSingleDevice(newValue)
        .subscribe((res: any) => {
        
          var response = JSON.parse(res.response);
          if (res.status != 200 && res.status != 0) {
           
            if(response.errors[0].msg != undefined || response.errors[0].msg != null)this.alertService.basicAlert("Error", response.errors[0].msg, 'error');
            if(response.errors[0].message != undefined || response.errors[0].message != null)this.alertService.basicAlert("Error", response.errors[0].message, 'error');
            this.loaderService.hide();
    
            return;
          }
          if (res.status == 200) {
            var response = JSON.parse(res.response);
            this.storageService.Device = response
            this.GetAssignedEmployees() ;
            this.GetDevice();

    
          } else {
            this.alertService.basicAlert("Error", response.errors[0].message, 'info');
            this.loaderService.hide();
    
          }
    
    
        })
    
    }







   
}
