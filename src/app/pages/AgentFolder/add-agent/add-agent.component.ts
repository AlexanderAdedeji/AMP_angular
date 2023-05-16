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
@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent implements OnInit {


  createAgent = true;
  AllUser: boolean;
  CreateNewAgentForm: FormGroup;
  errorMessage = '';
  validationMessages;
  constructor(private authService: AuthService,
    private agentsService: AgentsService,
    private formBuilder: FormBuilder,
    private router: Router,
    public FValidations: FormMatters,
    public constants: Constants,
    public storageService: StorageService,
    public loaderService: LoaderService,
    public encodeAESService: EncodeAESService,
    public alertService: AlertService) { 

      this.getAllConstants(); 
    

    }

  ngOnInit(): void {
    this.CreateNewAgentForm = this.FValidations.AgentRegistrationMethod();
    this.validationMessages = this.constants.forErrorMessages();
  }
   /** Get all contants  */
   getAllConstants() {
    this.constants = new Constants();
   }



   createANewAgent(value){ 
     value.token = 'Token ' + JSON.parse(sessionStorage.getItem('user')).token
     const newValue = this.encodeAESService.encryptData(value)


      this.loaderService.show();
      this.agentsService.registerAgents(newValue)
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
          // const CreatedfullName = response.first_name + " " + response.last_name
          //this.storageService.userDetails = 
          this.alertService.basicAlert("Successful", response.name + 'created', 'success');
          this.loaderService.hide();

        } else {
          this.alertService.basicAlert("Error", response.errors[0].message, 'info');
          this.loaderService.hide();

        }


      })

  

   }


}
