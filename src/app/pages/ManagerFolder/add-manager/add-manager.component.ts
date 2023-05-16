import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncodeAESService } from 'app/Business/AES/aes';
import { FormMatters } from 'app/Business/formMatters/formMatters';
import { AlertService } from 'app/Business/tools/alert/alert.service';
import { Constants } from 'app/Business/tools/constants/constants';
import { StorageService } from 'app/Business/tools/storage/storge-service.service';
import { AgentsService } from 'app/Services/Agents/agents.service';
import { AuthService } from 'app/Services/AuthService/auth.service';
import { LoaderService } from 'app/Services/loader/loader.service';
import { UserTypesService } from 'app/Services/UserTypes/userTypes.service';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent implements OnInit {
 
  createUser = true;
  AllUser: boolean;
  CreateNewUserForm: FormGroup;
  errorMessage = '';
  validationMessages;
  AllAgentsData;
  AgentDetails
  ManagerUserType;
  isSuperUser:boolean;
  isAgent: boolean;
  userType;


  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public FValidations: FormMatters,
    public constants: Constants,
    public storageService: StorageService,
    public loaderService: LoaderService,
    public encodeAESService: EncodeAESService,
    public alertService: AlertService,
    public userTypes:UserTypesService,
    private agentsService: AgentsService) { 
      // this.getAgentDetails();
      this.getCurrentUserType()
      this.GetAllUserTypes();
      this.GetAgentFullDetails();
      this.getAllConstants(); 

     
     
    
    }



  ngOnInit(): void {
    this.CreateNewUserForm = this.FValidations.userRegistrationMethod();
    this.validationMessages = this.constants.forErrorMessages();
  }


  // GetAllAgents() {
  //   this.AllAgentsData=   this.storageService.AllAgentsData
  //     }
  getCurrentUserType(){

    this.userType = JSON.parse(sessionStorage.getItem('user')).user_type.name
    this.userType === 'SUPERUSER'? this.isSuperUser = true : this.isSuperUser = false
    
  }

  getAgentDetails(){
    this.AgentDetails= this.storageService.FullAgentsDetails.agent

  }
  

Cancel(){

  if(this.isSuperUser)this.router.navigate(['AMP/agentdetails'])
  else this.router.navigate(['AMP/managers/allManagers'])
}


  GetUserTypes() {

    this.ManagerUserType= this.storageService.AllUserTypes.filter(UserType=>(UserType.name == "AGENT_MANAGER"));
    const userType = JSON.parse(sessionStorage.getItem('user')).user_type.name
    userType === 'SUPERUSER'? this.isSuperUser = true : this.isSuperUser = false


      }


    /** Get all contants  */
    getAllConstants() {
      this.constants = new Constants();
    }

    createANewAgentUser(value){
      value.token = 'Token ' + JSON.parse(sessionStorage.getItem('user')).token
      value.user_type_id = this.ManagerUserType[0].id
      value.agent_id = this.AgentDetails.id
      const newValue = this.encodeAESService.encryptData(value)

      this.loaderService.show();
        this.authService.registerAgentManager(newValue)
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
              const CreatedfullName = response.first_name + " " + response.last_name
              this.alertService.basicAlert("Successful", CreatedfullName + ' Created', 'success');
              this.loaderService.hide();
    
            } else {
              this.alertService.basicAlert("Error", response.errors[0].message, 'info');
              this.loaderService.hide();
    
            }
    
    
          })

    }
  


    
    GetAllUserTypes(){
      
      let value = {
        token : ''
      };
      // value.token = this.storageService.token;
      value.token = 'Token ' + JSON.parse(sessionStorage.getItem('user')).token
      const newValue = this.encodeAESService.encryptData(value)
      this.loaderService.show();
      this.userTypes.getAllUserTypes(newValue)
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
                    this.storageService.AllUserTypes= response;
                    this.GetUserTypes()
                    this.loaderService.hide();
            
                  }
                   else {
                    this.alertService.basicAlert("Error", response.errors[0].message, 'info');
                    this.loaderService.hide();
            
                  }

          })
    }


    GetAgentFullDetails(){
     
      // let value = {
      //   token : '',
      //   agent_id:this.storageService.authenticatedUserDetails.agent_id
      // };
      
      let value = {
        token : '',
        agent_id:''
      };
      value.token =   'Token ' + JSON.parse(sessionStorage.getItem('user')).token
      this.isSuperUser? value.agent_id = JSON.parse(sessionStorage.getItem('id')): value.agent_id =  JSON.parse(sessionStorage.getItem('user')).agent_id
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
            this. getAgentDetails()
    
    
          } else {
            this.alertService.basicAlert("Error", response.errors[0].message, 'info');
            this.loaderService.hide();
    
          }
    
    
        })
    
    }

}
