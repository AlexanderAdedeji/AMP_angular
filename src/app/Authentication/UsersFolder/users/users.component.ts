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
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
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
      this.ViewAllUsers();
      this.getAllConstants(); 
    
    }

  ngOnInit(): void {

    
  }

  /** Get all contants  */
  getAllConstants() {
    this.constants = new Constants();
  }

 


  ViewAllUsers() {
    this.router.navigate(['AMP/allusers']);

  }


  // swap(page) {
  //   if (page == '') {

  //   }

  // }
}
