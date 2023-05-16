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
import { LoaderService } from 'app/Services/loader/loader.service';
@Component({
  selector: 'app-all-agents',
  templateUrl: './all-agents.component.html',
  styleUrls: ['./all-agents.component.css']
  
})
export class AllAgentsComponent implements OnInit {
  AllAgentsData;
  AgentFullDetatils;
  agent_id;
  searchedItem: string = '';

  constructor(private authService: AuthService,
    private agentsService: AgentsService,
    private formBuilder: FormBuilder,
    private router: Router,
    public FValidations: FormMatters,
    public constants: Constants,
    public storageService: StorageService,
    public loaderService: LoaderService,
    public encodeAESService: EncodeAESService,
    public alertService: AlertService)
     {
        this.GetAllAgents(); // get all agents
    }

  ngOnInit(): void {


  }




  GetAgents() {
    this.AllAgentsData=   this.storageService.AllAgentsData;


  }


  search(){
    const data= this.AllAgentsData.filter(agent=>agent.name.includes(this.searchedItem) || agent.email.includes(this.searchedItem))
    this.AllAgentsData = data
  }

    
  GetAllAgents(){
    let value = {
      token : ''
    };

    value.token = 'Token ' + JSON.parse(sessionStorage.getItem('user')).token
    const newValue = this.encodeAESService.encryptData(value)
    this.loaderService.show();
  
    this.agentsService.getAllAgents(newValue)
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
          this.storageService.AllAgentsData = response;
          this.GetAgents() 
          this.loaderService.hide();
  
        } else {
          this.alertService.basicAlert("Error", response.errors[0].message, 'info');
          this.loaderService.hide();
  
        }
  
  
      })
  
  }







  eachAgentDetails(agent){
    this.storageService.Agent =agent 
    JSON.stringify(sessionStorage.setItem('id', agent.id))
   this.GetAgentFullDetails(agent.id)
  

  }


  agentFullDetatils(){
    this.AgentFullDetatils = this.storageService.FullAgentsDetails;

    this.router.navigate(['AMP/agentdetails'])
  
  }

  createANewUserLink() {
    this.router.navigate(['AMP/addAgents']);
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
          this.agentFullDetatils();
          this.loaderService.hide();
  
        } else {
          this.alertService.basicAlert("Error", response.errors[0].message, 'info');
          this.loaderService.hide();
  
        }
  
  
      })
  
  }



  
}
