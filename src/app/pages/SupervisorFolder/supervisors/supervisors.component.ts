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
  selector: 'app-supervisor',
  templateUrl: './supervisors.component.html',
  styleUrls: ['./supervisors.component.css']
})
export class SupervisorsComponent implements OnInit {
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
      this.ViewAllSupervisors();
    
    }

  ngOnInit(): void {
    
  }

  /** Get all contants  */
  getAllConstants() {
    this.constants = new Constants();
  }


  /** create a new user */
  createANewSupervisorLink() {
    this.router.navigate(['AMP/supervisors/addSupervisor']);
  }


  ViewAllSupervisors() {
 
    this.router.navigate(['AMP/supervisors/allSupervisors']);

  }


  swap(page) {
    if (page == '') {

    }

  }
}
