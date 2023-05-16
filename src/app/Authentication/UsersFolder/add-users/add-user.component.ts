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
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
 
  createUser = true;
  AllUser: boolean;
  CreateNewUserForm: FormGroup;
  errorMessage = '';
  validationMessages;
  AllAgentsData;
  OfficerUserType;
  isSuperUser:boolean;
  isAgent: boolean;


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
      this.GetAllAgents();
      this.getAllConstants(); 
     this.GetAllUserTypes()  
    }



  ngOnInit(): void {
    this.CreateNewUserForm = this.FValidations.userRegistrationMethod();
    this.validationMessages = this.constants.forErrorMessages();
  }


  GetAllAgents(){
    this.AllAgentsData=   this.storageService.AllAgentsData
}


GetAllUserTypes() {
    this.OfficerUserType= this.storageService.AllUserTypes.filter(UserType=>(UserType.name == "AGENT_OFFICER"));

    const userType = this.storageService.UserType.name
    userType === 'SUPERUSER'? this.isSuperUser = true : this.isSuperUser = false

}




    /** Get all contants  */
    getAllConstants() {
      this.constants = new Constants();
    }

    createANewAgentUser(value){

      value.token = this.storageService.token;
      value.user_type_id = this.OfficerUserType[0].id
      const newValue = this.encodeAESService.encryptData(value)

      this.loaderService.show();
        this.authService.registerAgentUser(newValue)
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
              //this.storageService.userDetails = 
              this.alertService.basicAlert("Successful", CreatedfullName, 'success');
              this.loaderService.hide();
    
            } else {
              this.alertService.basicAlert("Error", response.errors[0].message, 'info');
              this.loaderService.hide();
    
            }
    
    
          })

    }

}
