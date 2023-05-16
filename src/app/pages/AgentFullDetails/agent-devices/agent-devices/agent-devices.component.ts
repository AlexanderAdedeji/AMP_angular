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
  selector: 'app-agent-devices',
  templateUrl: './agent-devices.component.html',
  styleUrls: ['./agent-devices.component.css']
})
export class AgentDevicesComponent implements OnInit {

  AgentDevices;
  AgentName;
  AgentDetails;
  Device;
   AgentProfile;
  agent_id

  constructor(
    private authService: AuthService,
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
  )
  {

    this.agent_id =   JSON.parse(sessionStorage.getItem('id'))
    this.  GetAgentFullDetails(this.agent_id)
    // this.getAgentDevices();
    this.getAgentDetails();
    this. getAgentName();
   }

  ngOnInit(): void {
  }

  getAgentDetails(){
    this.AgentDetails= this.storageService.FullAgentsDetails
  }
  getAgentDevices(){
      
    this.AgentDevices= this.storageService.FullAgentsDetails.devices
 
  }

  getAgentName(){
    this.AgentName= this.storageService.FullAgentsDetails.agent.name

  }

  CreateDevice(){
    this.router.navigate(["AMP/createDevices"])

  }

        //Update Device
        updateDevice(deviceId,macId){
      
        }




















  /******************************* Activate Devices********************* */
  activateDevice(deviceid){   
     const value={"device_id":deviceid, token:""}
      value.token = 'Token ' + JSON.parse(sessionStorage.getItem('user')).token;
   
      const newValue = this.encodeAESService.encryptData(value)
      this.loaderService.show();
      this.devicesService.activateDevice(newValue)
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
            this.alertService.basicAlert("Device Successfully Activated");
            this.loaderService.hide();
            this.  GetAgentFullDetails(this.agent_id)
  
          } else {
            this.alertService.basicAlert("Error", response.errors[0].message, 'info');
            this.loaderService.hide();
  
          }
  
  
        })
  
    }
  

  /******************************* Deactivate Devices********************* */
Delete(deviceId){
 
  const value={"device_id":deviceId, token:""}
      value.token = 'Token ' + JSON.parse(sessionStorage.getItem('user')).token;
     
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
            this.  GetAgentFullDetails(this.agent_id)
  
          } else {
            this.alertService.basicAlert("Error", response.errors[0].message, 'info');
            this.loaderService.hide();
  
          }
  
  
        })
}

  deactivateDevice(deviceId){

    const value={"device_id":deviceId, token:""}
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
            this.GetAgentFullDetails(this.agent_id)
  
          } else {
            this.alertService.basicAlert("Error", response.errors[0].message, 'info');
            this.loaderService.hide();
  
          }
  
  
        })

  }




    checkUser(device, value){

      JSON.stringify(sessionStorage.setItem('device_id', device.id))
      this.storageService.Device=device;
      this.AgentDetails=this.storageService.FullAgentsDetails
      if (value == 'a'){
        this.router.navigate(["AMP/assignUser"])

        }
        else{
        this.router.navigate(["AMP/deAssignUser"])
    
     

        }
    }








      
  GetAgentFullDetails(agentId){

    let value = {
      token : '',
      agent_id:agentId
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
          this.AgentProfile = this.storageService.FullAgentsDetails;
          this.loaderService.hide();
          this.getAgentDevices();
          this.getAgentDetails();
          this. getAgentName();
  
        } else {
          this.alertService.basicAlert("Error", response.errors[0].message, 'info');
          this.loaderService.hide();
  
        }
  
  
      })
  
  }





}
