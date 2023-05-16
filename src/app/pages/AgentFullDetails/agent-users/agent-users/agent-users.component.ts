import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'app/Business/tools/storage/storge-service.service';
import { EncodeAESService } from 'app/Business/AES/aes';
import { FormMatters } from 'app/Business/formMatters/formMatters';
import { AlertService } from 'app/Business/tools/alert/alert.service';
import { Constants } from 'app/Business/tools/constants/constants';

import { AuthService } from 'app/Services/AuthService/auth.service';
import { AgentsService } from 'app/Services/Agents/agents.service';
import { LoaderService } from 'app/Services/loader/loader.service';


@Component({
  selector: 'app-agent-users',
  templateUrl: './agent-users.component.html',
  styleUrls: ['./agent-users.component.css']
})
export class AgentUsersComponent implements OnInit {
  AgentOfficers;
  agentName;
  agent_id
  constructor(
    private router:Router,
    public storageService:StorageService,
    private authService: AuthService,
    private agentsService: AgentsService,
    public FValidations: FormMatters,
    public constants: Constants,
    public loaderService: LoaderService,
    public encodeAESService: EncodeAESService,
    public alertService: AlertService,


  ) { 
    this.agent_id =   JSON.parse(sessionStorage.getItem('id'))
    this.  GetAgentFullDetails(this.agent_id)
    // this.getAgentOfficers()
  }

  ngOnInit(): void {
  }


  getAgentOfficers(){
    this.agentName= this.storageService.FullAgentsDetails.agent.name
    this.AgentOfficers = this.storageService.FullAgentsDetails.employees.filter(employee=> employee.user_type.name === 'AGENT_OFFICER')

  }

  createANewOfficerLink() {
    this.router.navigate(['AMP/addofficer']);
  }


  activateUser(id){
    let path="activate"
   this.connectToService(id,path)
  }


  viewUser(userId){
 
    sessionStorage.setItem('user_id', userId)
    this.router.navigate(['AMP/userFullDetails'])
  }
  
  

  resetPassword(email){
    let value = {
      token : '',
      email:email
    };
    // value.token = this.storageService.token;
    value.token =  'Token ' + JSON.parse(sessionStorage.getItem('user')).token
    const newValue = this.encodeAESService.encryptData(value)
    this.loaderService.show();
    this.authService.RequestPasswordReset(newValue)
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
          this.loaderService.hide();
          this.alertService.basicAlert(response.message);
          this.alertService.basicAlert( "Info", response.message, "info");

         
        } else {
          this.alertService.basicAlert("Error", response.errors[0].message, 'info');
          this.loaderService.hide();
        }
  
  
      })   

}

  
  
  deactivateUser(id){
  
  let path="Deactivate"
   this.connectToService(id,path)
  }
  
  
  
  connectToService(user,connect){
    let value = {
          token : 'Token ' + JSON.parse(sessionStorage.getItem('user')).token,
          userId:user.id
      
        };
        // value.token = this.storageService.token; 
        const newValue = this.encodeAESService.encryptData(value)
        this.loaderService.show();
        if(connect =="activate"){
          this.authService.activateUser(newValue)
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
              this.storageService.AllAgentUsersData= response;
              this.alertService.basicAlert(user.first_name+ ' '+ user. last_name + " Activated SuccessFull");
              this.loaderService.hide();
              this.agent_id =   JSON.parse(sessionStorage.getItem('id'))
              this.  GetAgentFullDetails(this.agent_id)
      
            } else {
              this.alertService.basicAlert("Error", response.errors[0].message, 'info');
              this.loaderService.hide();
      
            }
      
      
          })
        }else if(connect == "Deactivate"){
          this.authService.DeactivateUser(newValue)
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
              this.storageService.AllAgentUsersData= response;
              let fullName=user.first_name + ' ' + user.last_name
              this.alertService.basicAlert(user.first_name+ ' '+ user. last_name + " Deactivated SuccessFull");
              this.loaderService.hide();
              this.agent_id =   JSON.parse(sessionStorage.getItem('id'))
              this.  GetAgentFullDetails(this.agent_id)
      
            } else {
              this.alertService.basicAlert("Error", response.errors[0].message, 'info');
              this.loaderService.hide();
      
            }
      
      
          })
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
              this.loaderService.hide();
              this.getAgentOfficers()
      
            } else {
              this.alertService.basicAlert("Error", response.errors[0].message, 'info');
              this.loaderService.hide();
      
            }
      
      
          })
      
      }
}
