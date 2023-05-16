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
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {

  AllAgentsData ;

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

      //this.GetAllAgents(); // get all agents
      this.getAllConstants(); 
      this.ViewAllAgents();
    
      
    }

  ngOnInit(): void {
  
  }

   /** Get all contants  */
   getAllConstants() {
    this.constants = new Constants();
  }

   /** create a new user */
   createANewUserLink() {
    this.router.navigate(['AMP/agents/addAgents']);
  }


  ViewAllAgents() {
 
    this.router.navigate(['AMP/agents/allAgents']);

  }




}
