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
import { ObjectBindingOrAssignmentPattern } from 'typescript';
@Component({
  selector: 'app-all-supervisors',
  templateUrl: './all-supervisors.component.html',
  styleUrls: ['./all-supervisors.component.css']
})
export class AllSupervisorsComponent implements OnInit {
  AllAgentsData;
  AllUsersData;
  isSuperUser:boolean;
  SupervisorDetails:any[];
  searchedItem: string = '';

  constructor(
    private authService: AuthService,
    private agentsService: AgentsService,
    private formBuilder: FormBuilder,
    private router: Router,
    public FValidations: FormMatters,
    public constants: Constants,
    public storageService: StorageService,
    public loaderService: LoaderService,
    public encodeAESService: EncodeAESService,
    public alertService: AlertService
  ) {
    // this.GetAllAgents();
    this.checkUserType()
    // this.GetAllSupervisors()
    this.GetAgentFullDetails()

  }

  ngOnInit(): void {
  }

  /**
   * 
   * GET AL THE AGENT STORED IN THE STORAGE
   */
  // GetAllAgents() {
  //   this.AllAgentsData = this.storageService.AllAgentsData;
  // }



  viewUser(userId){
    sessionStorage.setItem('user_id', userId)
    this.router.navigate(['AMP/userFullDetails'])
  }


  GetAllSupervisors(){

    this.SupervisorDetails = this.storageService.AllAgentSupervisorsData;
   
  }
  createANewSupervisorLink() {
    this.router.navigate(['AMP/addSupervisor']);
    }


    search(){
      const data= this.SupervisorDetails.filter(user=>user.lasrra_id.includes(this.searchedItem) || user.phone.includes(this.searchedItem)|| user.first_name.includes(this.searchedItem) || (user.first_name + ' ' + user.last_name).includes(this.searchedItem) || (user.first_name + '' + user.last_name).includes(this.searchedItem) || user.last_name.includes(this.searchedItem) || user.email.includes(this.searchedItem))
      this.SupervisorDetails = data
    }

  // getAgent(){

  //   // const userAgentId=this.AllUsersData.map(user=>user.agent_id)  
  //   this.AllUsersData = this.storageService.AllAgentUsersData;  
  //   let agent_ids = new Object
  //   this.AllAgentsData.forEach((agent)=>{
  //     agent_ids[agent.id] = agent.first_name
  //   })

  //   this.OfficerDetails=[]
  //   this.AllUsersData.forEach((user)=>{
  //    this.OfficerDetails.push({user:user, agent:agent_ids[user.agent_id]})
  //   })

  // } 


  checkUserType(){
    const userType = JSON.parse(sessionStorage.getItem('user')).user_type.name
    if(userType === 'SUPERUSER'){
      this.isSuperUser = true;
    }
    else{
      this.isSuperUser=false;

    }
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

  
activateUser(id){
  let path="activate"
 this.connectToService(id,path)
}




deactivateUser(id){

let path="Deactivate"
 this.connectToService(id,path)
}




  
  




connectToService(user,connect){

  let value = {
        token : '',
        userId:user.id
    
      };
          value.token =
            "Token " + JSON.parse(sessionStorage.getItem("user")).token;
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
            const fullName = user.first_name + ' ' + user.last_name
            this.alertService.basicAlert(fullName +" Activated SuccessFull");
            this.loaderService.hide();
            this.GetAgentFullDetails();
    
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
            const fullName = user.first_name + ' ' + user.last_name
            this.alertService.basicAlert( fullName+" Deactivated SuccessFull");
            this.loaderService.hide();
            this.GetAgentFullDetails();
    
          } else {
            this.alertService.basicAlert("Error", response.errors[0].message, 'info');
            this.loaderService.hide();
    
          }
    
    
        })
      }
    
    }



    GetAgentFullDetails(){

      // let value = {
      //   token : '',
      //   agent_id:this.storageService.authenticatedUserDetails.agent_id
      // };
      
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
            this.storageService.AllAgentSupervisorsData = this.storageService.FullAgentsDetails.employees.filter(employees=> employees.user_type.name == 'AGENT_SUPERVISOR' && employees.email !== JSON.parse(sessionStorage.getItem('user')).email)
            this.storageService.AllDeviceData = this.storageService.FullAgentsDetails.devices
            this.loaderService.hide();
            this.GetAllSupervisors();
    
    
          } else {
            this.alertService.basicAlert("Error", response.errors[0].message, 'info');
            this.loaderService.hide();
    
          }
    
    
        })
    
    }





}
