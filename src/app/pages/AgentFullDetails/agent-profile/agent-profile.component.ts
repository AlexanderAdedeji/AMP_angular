import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/Business/tools/storage/storge-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { EncodeAESService } from 'app/Business/AES/aes';
import { AlertService } from 'app/Business/tools/alert/alert.service';
import { Constants } from 'app/Business/tools/constants/constants';
import { AgentsService } from 'app/Services/Agents/agents.service';
import { AuthService } from 'app/Services/AuthService/auth.service';
import { DevicesService } from 'app/Services/Devices/devices.service';
import { LoaderService } from 'app/Services/loader/loader.service';
import { UserTypesService } from 'app/Services/UserTypes/userTypes.service';
import Chart from 'chart.js';


@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.component.html',
  styleUrls: ['./agent-profile.component.css']
})
export class AgentProfileComponent implements OnInit {
AgentProfile;
AgentManagers;
AgentOfficers;
AgentSupervisors;
AgentDevices;
agent_id
  constructor(
    private storageService: StorageService,
    private activatedRoute:ActivatedRoute,
    private route:Router,
    private agentsService: AgentsService,
    private userTypes: UserTypesService,
    public constants: Constants,
    public loaderService: LoaderService,
    public encodeAESService: EncodeAESService,
    public alertService: AlertService
  )
   {
    this.agent_id =   JSON.parse(sessionStorage.getItem('id'))
    this.  GetAgentFullDetails(this.agent_id)


   }
   
   
    



  ngOnInit(): void {
  }


  full(){

     this.AgentManagers = this.AgentProfile.employees.filter(employee=>employee.user_type.name === 'AGENT_MANAGER')
     this.AgentOfficers = this.AgentProfile.employees.filter(employee=>employee.user_type.name === 'AGENT_OFFICER')
     this.AgentSupervisors = this.AgentProfile.employees.filter(employee=>employee.user_type.name === 'AGENT_SUPERVISOR')

  }
 


  
  GetAgentFullDetails(agentId){
    let value = {
      token : '',
      agent_id:agentId
    };

    // value.token = this.storageService.token;
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
          this.AgentDevices = this.AgentProfile.devices.length;
          this.full();
          this.loaderService.hide();
  
        } else {
          this.alertService.basicAlert("Error", response.errors[0].message, 'info');
          this.loaderService.hide();
  
        }
  
  
      })
  
  }



}
