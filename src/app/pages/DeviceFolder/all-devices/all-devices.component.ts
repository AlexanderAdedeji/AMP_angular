import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EncodeAESService } from 'app/Business/AES/aes';
import { FormMatters } from 'app/Business/formMatters/formMatters';
import { AlertService } from 'app/Business/tools/alert/alert.service';
import { Constants } from 'app/Business/tools/constants/constants';
import { StorageService } from 'app/Business/tools/storage/storge-service.service';
import { AuthService } from 'app/Services/AuthService/auth.service';
import { AgentsService } from 'app/Services/Agents/agents.service';
import { DevicesService } from 'app/Services/Devices/devices.service';
import { LoaderService } from 'app/Services/loader/loader.service';

@Component({
  selector: 'app-devices',
  templateUrl: './all-devices.component.html',
  styleUrls: ['./all-devices.component.css']
})


export class AllDevicesComponent implements OnInit {
  AllDevicesData;
  AgentDetails;
  Device;
  agent_id;
  isManager:Boolean=false;
  isSuperUser:Boolean=false;
  searchedItem: string = '';



  constructor(private authService: AuthService,
    private agentsService: AgentsService,
    private devicesService:DevicesService,
    private formBuilder: FormBuilder,
    private router: Router,
    public FValidations: FormMatters,
    public constants: Constants,
    public storageService: StorageService,
    public loaderService: LoaderService,
    public encodeAESService: EncodeAESService,
    public alertService: AlertService
    ) {

    this.checkUser_type(); 

   
  }

  ngOnInit(): void {
  }



  CreateDevice(){
    this.router.navigate(["AMP/createDevices"])

  }

  //Update Device
  updateDevice(deviceId,macId){

  }

  search(){
    const data= this.AllDevicesData.filter(device=>device.name.includes(this.searchedItem))
    this.AllDevicesData = data
  }

  checkUser_type(){

    const user_type= JSON.parse(sessionStorage.getItem('user')).user_type.name 
    user_type === 'SUPERUSER'? this.isSuperUser= true: this.isSuperUser =false
    user_type === 'AGENT_MANAGER'? this.isManager = true: this.isManager =false
    if(this.isSuperUser)  this.GetAllDevices()
    else this.GetAgentFullDetails()

  }

  /******************************* Activate Devices********************* */
  activateDevice(deviceid){   
     const value={"device_id":deviceid, token:""}
      value.token = 'Token ' + JSON.parse(sessionStorage.getItem('user')).token
 
      const newValue = this.encodeAESService.encryptData(value)
      this.loaderService.show();
      this.devicesService.activateDevice(newValue)
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
            // const CreatedfullName = response.first_name + " " + response.last_name
            //this.storageService.userDetails = 
            this.alertService.basicAlert("Device Successfully Activated");
            this.loaderService.hide();
            this.checkUser_type();
  
          } else {
            this.alertService.basicAlert("Error", response.errors[0].message, 'info');
            this.loaderService.hide();
  
          }
  
  
        })
  
    }
  

  /******************************* Deactivate Devices********************* */
Delete(deviceId){

  const value={"device_id":deviceId, token:""}
      value.token = this.storageService.token;
 
      const newValue = this.encodeAESService.encryptData(value)
      this.loaderService.show();
      this.devicesService.Delete(newValue)
        .subscribe((res: any) => {
     
          // this.loaderService.hide();
          var response = JSON.parse(res.response);
          if (res.status != 200 && res.status != 0) {
            
            if(response.errors[0].msg != undefined || response.errors[0].msg != null)this.alertService.basicAlert("Error", response.errors[0].msg, 'error');
            if(response.errors[0].message != undefined || response.errors[0].message != null)this.alertService.basicAlert("Error", response.errors[0].message, 'error');
            this.loaderService.hide();
  
            return;
          }
          if (res.status == 200) {
    
            var response = JSON.parse(res.response);
            // const CreatedfullName = response.first_name + " " + response.last_name
            //this.storageService.userDetails = 
            this.alertService.basicAlert("Device Deleted Successfully");
            this.loaderService.hide();
  
          } else {
            this.alertService.basicAlert("Error", response.errors[0].message, 'info');
            this.loaderService.hide();
  
          }
  
  
        })
}

  deactivateDevice(deviceId){
 
    const value={"device_id":deviceId, token:""}
      // value.token = this.storageService.token;
      value.token = 'Token ' + JSON.parse(sessionStorage.getItem('user')).token;

      const newValue = this.encodeAESService.encryptData(value)
      this.loaderService.show();
      this.devicesService.DeactivateDevice(newValue)
        .subscribe((res: any) => {
       
          // this.loaderService.hide();
          var response = JSON.parse(res.response);
          if (res.status != 200 && res.status != 0) {
            
            if(response.errors[0].msg != undefined || response.errors[0].msg != null)this.alertService.basicAlert("Error", response.errors[0].msg, 'error');
            if(response.errors[0].message != undefined || response.errors[0].message != null)this.alertService.basicAlert("Error", response.errors[0].message, 'error');
            this.loaderService.hide();
  
            return;
          }
          if (res.status == 200) {
 
            var response = JSON.parse(res.response);
            // const CreatedfullName = response.first_name + " " + response.last_name
            //this.storageService.userDetails = 
            this.alertService.basicAlert("Device Deactivated Successfully");
            this.loaderService.hide();
            this.checkUser_type()
  
          } else {
            this.alertService.basicAlert("Error", response.errors[0].message, 'info');
            this.loaderService.hide();
  
          }
  
  
        })

  }





    checkUser(device, value){
      this.storageService.Device=device;
      JSON.stringify(sessionStorage.setItem("device_id", device.id));
      this.AgentDetails=this.storageService.FullAgentsDetails
      if (value == 'a'){
        this.router.navigate(["AMP/assignUser"])

        }
        else{
        this.router.navigate(["AMP/deAssignUser"])

        }
    }








  /***************** get all Devices***************  */
  GetDevices() {

    this.AllDevicesData=   this.storageService.AllDeviceData;  
  }

  
  GetAllDevices(){
  
    let value = {
      token : ''
    };
    value.token =  'Token ' + JSON.parse(sessionStorage.getItem('user')).token;
    const newValue = this.encodeAESService.encryptData(value)
    this.loaderService.show();
  
    this.devicesService.getAllDevices(newValue)
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
          this.storageService.AllDeviceData= response;
          this.GetDevices()
          this.loaderService.hide();
  
        } else {
          this.alertService.basicAlert("Error", response.errors[0].message, 'info');
          this.loaderService.hide();
  
        }
  
  
      })
  
  }









  GetAgentFullDetails(){

    let value = {
      token : '',
      agent_id: JSON.parse(sessionStorage.getItem('user')).agent_id
    };
    value.token =   'Token ' + JSON.parse(sessionStorage.getItem('user')).token
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
         
          if(this.storageService.UserType=='AGENT_MANAGER'){
            this.storageService.AllUsersData =this.storageService.FullAgentsDetails.employees
          }else{
            this.storageService.AllUsersData = this.storageService.FullAgentsDetails.employees.filter(employees=> employees.user_type.name == 'AGENT_OFFICER')
 
            
          }
         
          this.storageService.AllAgentUsersData = this.storageService.FullAgentsDetails.employees.filter(employees=> employees.user_type.name == 'AGENT_OFFICER')
          this.storageService.AllAgentManagersData = this.storageService.FullAgentsDetails.employees.filter(employees=> employees.user_type.name == 'AGENT_MANAGER' && employees.email !== this.storageService.email)
          this.storageService.AllAgentSupervisorsData = this.storageService.FullAgentsDetails.employees.filter(employees=> employees.user_type.name == 'AGENT_SUPERVISOR' && employees.email !== this.storageService.email)
          this.storageService.AllDeviceData = this.storageService.FullAgentsDetails.devices
          this.loaderService.hide();
          this.GetDevices();  
  
        } else {
          this.alertService.basicAlert("Error", response.errors[0].message, 'info');
          this.loaderService.hide();
  
        }
  
  
      })
  
  }
    




























  /******************************* Get Device********************* */
  // GetDevice(){
  //   this.Device = this.storageService.Device;

  // }




  // GetDevice(){
  //
  //   this.Device= this.storageService.Device;
  //   for (let i = 0; i < this.AllAgentsData.length; i++) {
  //     if (this.Device.agent_id === this.AllAgentsData[i].id){
  //        this.agent =this.AllAgentsData[i]
  //      this.GetAgentFullDetails(this.agent.id)    
  //     }
     
  //   }

  //   //this.router.navigate(["AMP/devices/assignUser"])
  //}

  








}
