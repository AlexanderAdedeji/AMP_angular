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



@Component({
  selector: 'app-officers',
  templateUrl: './officers.component.html',
  styleUrls: ['./officers.component.css']
})
export class OfficersComponent implements OnInit {
  AllAgentUsersData;
 

constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private agentsService: AgentsService,
    private router: Router,
    public FValidations: FormMatters,
    public constants: Constants,
    public storageService: StorageService,
    public loaderService: LoaderService,
    public encodeAESService: EncodeAESService,
    public alertService: AlertService) { 
  
      this.GetAgentFullDetails();
      this.getAllConstants(); 
     
      
    
    }

  ngOnInit(): void {
  
  }

  /** Get all contants  */
  getAllConstants() {
    this.constants = new Constants();
  }


  /** create a new user */
  createANewUserLink() {
    this.router.navigate(['AMP/officers/addOfficer']);

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
          this.ViewAllUsers();
  
        } else {
          this.alertService.basicAlert("Error", response.errors[0].message, 'info');
          this.loaderService.hide();
  
        }
  
  
      })
  
  }
  createANewUser(value) {
    // value.token = this.storageService.token;
    // const newValue = this.encodeAESService.encryptData(value)
    // this.loaderService.show();


    // this.alertService.registerAgentUser(newValue, this.storageService.token)
    //   .subscribe((res: any) => {

    //     // this.loaderService.hide();
    //     var response = JSON.parse(res.response);
    //     if (res.status != 200 && res.status != 0) {
          
    //       if(response.errors[0].msg != undefined || response.errors[0].msg != null)this.alertService.basicAlert("Error", response.errors[0].msg, 'error');
    //       if(response.errors[0].message != undefined || response.errors[0].message != null)this.alertService.basicAlert("Error", response.errors[0].message, 'error');
    //       this.loaderService.hide();

    //       return;
    //     }
    //     if (res.status == 200) {
    
    //       this.alertService.basicAlert("Successful", response.message, 'success');
    //       this.loaderService.hide();

    //     } else {
    //       this.alertService.basicAlert("Error", response.errors[0].message, 'info');
    //       this.loaderService.hide();

    //     }


    //   })

  }


  ViewAllUsers() {
 
    this.router.navigate(['AMP/officers/allofficers']);

  }


  swap(page) {
    if (page == '') {

    }

  }
}
