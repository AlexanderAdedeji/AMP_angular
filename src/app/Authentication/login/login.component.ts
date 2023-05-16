import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncodeAESService } from 'app/Business/AES/aes';
import { FormMatters } from 'app/Business/formMatters/formMatters';
import { Constants } from 'app/Business/tools/constants/constants';
import { StorageService } from 'app/Business/tools/storage/storge-service.service';
import { AuthService } from 'app/Services/AuthService/auth.service';
import { LoaderService } from 'app/Services/loader/loader.service';
import { AuthUserDetails} from 'app/Business/models/UserDetails';
import { AlertService } from 'app/Business/tools/alert/alert.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';
  validationMessages;
  UserData;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public FValidations: FormMatters,
    public constants: Constants,
    public storageService: StorageService,
    public loaderService: LoaderService,
    public encodeAESService: EncodeAESService,
    public alertService : AlertService

  ) { this.getAllConstants(); }

  ngOnInit(): void {
    this.loginForm = this.FValidations.LoginMethod();
    this.validationMessages = this.constants.forErrorMessages();
  }

  /** Get all contants  */
  getAllConstants() {
    this.constants = new Constants();
  }


  /** login method */
  login(value) {

   // this.router.navigate(['AMP/dashboard']);
    const newValue = this.encodeAESService.encryptData(value)
    this.loaderService.show();
    this.authService.loginUser(newValue)
      .subscribe((res: any) => {
        var response = JSON.parse(res.response);
        if (res.status != 200 && res.status != 0 ) {
          this.alertService.basicAlert("Error", response.errors[0].message);
        } else if(res.status == 200){
          
        //  this.storageService.authenticatedUserDetails = response
         sessionStorage.setItem('user', JSON.stringify(response));
         sessionStorage.setItem("id", JSON.stringify(response.agent_id));
          this.router.navigate(['AMP/dashboard']);
          // this.UserDetailsMapping(response);
          this.UserDetailsMapping(JSON.parse(sessionStorage.getItem('user')))
        
        }else{
          this.alertService.basicAlert("Error", response.errors[0].message);

        }
        this.loaderService.hide();

        //this.loginResposne(res);
      })
  }




  UserDetailsMapping(user : AuthUserDetails) {
   this.storageService.token = 'Token ' + user.token;
   this.storageService.UserType = user.user_type;
   this.storageService.email = user.email;
  }


}
