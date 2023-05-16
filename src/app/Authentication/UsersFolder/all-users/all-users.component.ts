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
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})


export class AllUsersComponent implements OnInit {
  AllAgentsData;
  AllUsersDetails:any[];
  isSuperUser:boolean;
  OfficerDetails:any[];
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
    // this.checkUserType()
    this.GetAllUsers()


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





  GetUsers(){
 
    this.AllUsersDetails = this.storageService.AllUsersData.filter(user=> user.email != JSON.parse(sessionStorage.getItem('user')).email);
    this.AllUsersDetails.forEach((user)=>{
 
    })

  }



  search(){

    const data= this.AllUsersDetails.filter(user=>user.lasrra_id.includes(this.searchedItem) || user.phone.includes(this.searchedItem)|| user.first_name.includes(this.searchedItem) || (user.first_name + ' ' + user.last_name).includes(this.searchedItem) || (user.first_name + '' + user.last_name).includes(this.searchedItem) || user.last_name.includes(this.searchedItem) || user.email.includes(this.searchedItem))
    this.AllUsersDetails = data

  }




  GetAllUsers(){
    let value = {
      token : '',
    };
    value.token =  'Token ' + JSON.parse(sessionStorage.getItem('user')).token
    const newValue = this.encodeAESService.encryptData(value)
    this.loaderService.show();
    this.authService.getAllUsers(newValue)
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
          this.storageService.AllUsersData=response.filter(user=>user.email !== this.storageService.email)
          this.GetUsers()
 
  
        } else {
          this.alertService.basicAlert("Error", response.errors[0].message, 'info');
          this.loaderService.hide();
  
        }
  
  
      })
  
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


viewUser(userId){

  sessionStorage.setItem('user_id', userId)
  this.router.navigate(['AMP/userFullDetails'])
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
//         this.storageService.AllUsersData=response.filter(user=>user.email !== this.storageService.email)
//    
//         this.GetUsers()

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
      value.token ='Token ' + JSON.parse(sessionStorage.getItem('user')).token; 
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
            this.alertService.basicAlert( user.first_name+ ' '+ user. last_name + " Activated SuccessFull");
            this.loaderService.hide();
            this.GetAllUsers()
    
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
            this.alertService.basicAlert(user.first_name+ ' '+ user. last_name + " Deactivated SuccessFull");
            this.loaderService.hide();
            this.GetAllUsers()
          } else {
            this.alertService.basicAlert("Error", response.errors[0].message, 'info');
            this.loaderService.hide();
    
          }
    
    
        })
      }
    
    }






}
