import { ErrorHandler, NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';





import { Constants } from '../../tools/constants/constants';
import { Url } from '../../tools/hd/lock/lk';

/** Http error class */
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS ,HttpBackend, HttpXhrBackend, HttpClientJsonpModule } from '@angular/common/http';
import { HttpErrorHandler } from '../../error/http-error-handler.service';

/** Reactive forms */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormMatters } from '../../formMatters/formMatters';

/** Providers */
import { StorageService } from '../../tools/storage/storge-service.service';
//import { LoaderComponent } from 'app/Business/Components/loader/loader/loader.component';
import { EncodeAESService } from 'app/Business/AES/aes';
///import { LoaderService } from 'app/Services/loader/loader.service';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { UsersComponent } from '../../../Authentication/UsersFolder/users/users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddAgentComponent } from 'app/pages/AgentFolder/add-agent/add-agent.component';
import { AddDeviceComponent } from 'app/pages/DeviceFolder/add-device/add-device.component';
import { AgentsComponent } from 'app/pages/AgentFolder/agents/agents.component';


import { SharedRoutes } from '../shared.routing';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AllAgentsComponent } from 'app/pages/AgentFolder/all-agents/all-agents.component';
import { AllDevicesComponent } from 'app/pages/DeviceFolder/all-devices/all-devices.component';
import { AssignUserComponent } from 'app/pages/DeviceFolder/assign-user/assign-user.component';
import { DeAssignUserComponent } from 'app/pages/DeviceFolder/deAssign-user/deAssign-user.component';
import { AddSupervisorComponent } from 'app/pages/SupervisorFolder/add-supervisor/add-supervisor.component';
import { AllSupervisorsComponent } from 'app/pages/SupervisorFolder/all-supervisors/all-supervisors.component';
import { SupervisorsComponent } from 'app/pages/SupervisorFolder/supervisors/supervisors.component';
import { ManagersComponent } from 'app/pages/ManagerFolder/managers/managers.component';
import { AllManagersComponent } from 'app/pages/ManagerFolder/all-managers/all-managers.component';
import { AddManagerComponent } from 'app/pages/ManagerFolder/add-manager/add-manager.component';
import { AddOfficerComponent } from 'app/pages/OfficerFolder/add-officers/add-officer.component';
import { AllOfficersComponent } from 'app/pages/OfficerFolder/all-officers/all-officers.component';
import { OfficersComponent } from 'app/pages/OfficerFolder/officers/officers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllUsersComponent } from 'app/Authentication/UsersFolder/all-users/all-users.component';
import { AddUserComponent } from 'app/Authentication/UsersFolder/add-users/add-user.component';



@NgModule({
    declarations: [
        UsersComponent,
        AddUserComponent,
        AllUsersComponent,
        SupervisorsComponent,
        AddOfficerComponent,
        AllOfficersComponent,
        OfficersComponent,
        AddSupervisorComponent,
        AllSupervisorsComponent,
        ManagersComponent,
        AllManagersComponent,
        AddManagerComponent,
        AddAgentComponent,
        AddDeviceComponent,
        AgentsComponent,
        AllAgentsComponent,
        AllDevicesComponent,
        AssignUserComponent,
        DeAssignUserComponent
        //LoaderComponent
    ],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                HttpClientJsonpModule,
                NgbModule,
                RouterModule.forChild(SharedRoutes),
                MatIconModule
                // NgxSpinnerModule,
              
                // Ng2SearchPipeModule,
                // Ng2OrderModule,
              
                
    ],
    providers: [Constants, 
                Url,
                HttpClient,FormMatters,
                HttpErrorHandler,
                HttpClient,
                ErrorHandler,
                StorageService,
                EncodeAESService
                //LoaderService
             
            ],
    bootstrap: [],
    exports: [
    ],
    entryComponents: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  })
  export class SharedModule { }