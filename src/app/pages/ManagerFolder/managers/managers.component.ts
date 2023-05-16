import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncodeAESService } from 'app/Business/AES/aes';
import { FormMatters } from 'app/Business/formMatters/formMatters';
import { AlertService } from 'app/Business/tools/alert/alert.service';
import { Constants } from 'app/Business/tools/constants/constants';
import { StorageService } from 'app/Business/tools/storage/storge-service.service';
import { AuthService } from 'app/Services/AuthService/auth.service';
import { LoaderService } from 'app/Services/loader/loader.service';



@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {
  AllAgentUsersData;
 

constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public FValidations: FormMatters,
    public constants: Constants,
    public storageService: StorageService,
    public loaderService: LoaderService,
    public encodeAESService: EncodeAESService,
    public alertService: AlertService) { 
      this.getAllConstants(); 
      this.ViewAllManagers() ;
    }

  ngOnInit(): void {
    
  }

  /** Get all contants  */
  getAllConstants() {
    this.constants = new Constants();
  }


  /** create a new user */
  // createANewManagerLink() {

  //   this.router.navigate(['AMP/addManager'])

  // }

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


  ViewAllManagers() {
 
    this.router.navigate(['AMP/managers/allManagers']);


  }


  // swap(page) {
  //   if (page == '') {

  //   }

  // }
}
