import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { StorageService } from 'app/Business/tools/storage/storge-service.service';
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
  selector: 'app-agent-detatils',
  templateUrl: './agent-detatils.component.html',
  styleUrls: ['./agent-detatils.component.css']
})
export class AgentDetatilsComponent implements OnInit {
  AgentDeets;
  AgentFullDetatils;
  AgentProfile;
  agent_id;

  constructor(
    private route:Router,
    private storageService: StorageService,
    private activatedRoute:ActivatedRoute,
    private agentsService: AgentsService,
    private router: Router,
    private userTypes: UserTypesService,
    public constants: Constants,
    public loaderService: LoaderService,
    public encodeAESService: EncodeAESService,
    public alertService: AlertService

  ) 
  {
    this.agent_id =   JSON.parse(sessionStorage.getItem('id'))
    this.AgentProfile = this.storageService.FullAgentsDetails;
    this.GetAgentFullDetails(this.agent_id ) 
    this.checkRoute()

  

   }
  ngOnInit(): void {  
    this.agentProfile()
    this.toggleActive()
  }



  toggleActive(){
    // Get the container element
var btnContainer = document.getElementById("myDIV");

// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("btnn");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
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
          this.loaderService.hide();
  
        } else {
          this.alertService.basicAlert("Error", response.errors[0].message, 'info');
          this.loaderService.hide();
  
        }
  
  
      })
  
  }






  agentSupervisors(){
    this.route.navigate(['AMP/agentdetails/agentadmins'])
  }

  agentDevices(){
    this.route.navigate(['AMP/agentdetails/agentdevice'])
  }
  agentProfile()
{
  this.route.navigate(['AMP/agentdetails/agentprofile'])
}
  agentOfficers(){
    this.route.navigate(['AMP/agentdetails/agentusers'])
  }
  

  agentManagers(){
    this.route.navigate(['AMP/agentdetails/agentmanager'])
  }




  checkRoute(){
    if(this.router.url==='/AMP/agentdetails/agentprofile'){
      this.agentProfile()
    }
    else if(this.router.url==='/AMP/agentdetails/agentmanager'){
      this.agentManagers()
    }
    else if(this.router.url==='/AMP/agentdetails/agentadmins'){
      this.agentSupervisors()
    }else if(this.router.url==='/AMP/agentdetails/agentusers'){
        this.agentOfficers()
    }
    else{
      this.agentDevices()
    }
  }

}
