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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  user;
  userDetails 

  constructor(
    private route:Router,
    private authService: AuthService,
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

   this.user = this.storageService.searchedUser
   this.getUserDetails()

   }
  ngOnInit(): void {  
  

  }


  getUserDetails(){
  
    this.userDetails = this.storageService.AllUsersData.filter(userDeet=> userDeet.email==this.user)
  }
  



  activateUser(id){
    let path="activate"
   this.connectToService(id,path)
  }
  
  
  
  
  deactivateUser(id){
  
  let path="Deactivate"
   this.connectToService(id,path)
  }
  
  
  // GetAllUsers(){
  //   let value = {
  //     token : '',
  //   };
  //   value.token = this.storageService.token;
  //   const newValue = this.encodeAESService.encryptData(value)
  //   this.loaderService.show();
  //   this.authService.getAllUsers(newValue)
  //     .subscribe((res: any) => {
      
  //       var response = JSON.parse(res.response);
  //       if (res.status != 200 && res.status != 0) {
         
  //         if(response.errors[0].msg != undefined || response.errors[0].msg != null)this.alertService.basicAlert("Error", response.errors[0].msg, 'error');
  //         if(response.errors[0].message != undefined || response.errors[0].message != null)this.alertService.basicAlert("Error", response.errors[0].message, 'error');
  //         this.loaderService.hide();
  
  //         return;
  //       }
  //       if (res.status == 200) {
  //         var response = JSON.parse(res.response);
  //         this.loaderService.hide();
  //         this.storageService.AllUsersData=response

  //         // this.GetUsers()
  
  //       } else {
  //         this.alertService.basicAlert("Error", response.errors[0].message, 'info');
  //         this.loaderService.hide();
  
  //       }
  
  
  //     })
  
  // }
  
  
    
    
  
  
  
  
  connectToService(user,connect){

    let value = {
          token : '',
          userId:user.id
      
        };
        value.token = this.storageService.token; 
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
              this.alertService.basicAlert(user.first_name +" Activated SuccessFull");
              this.loaderService.hide();
      
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
              this.alertService.basicAlert( user.first_name+" Deactivated SuccessFull");
              this.loaderService.hide();
      
            } else {
              this.alertService.basicAlert("Error", response.errors[0].message, 'info');
              this.loaderService.hide();
      
            }
      
      
          })
        }
      
      }



}
