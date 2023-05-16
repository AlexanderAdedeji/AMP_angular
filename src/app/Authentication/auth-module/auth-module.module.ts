import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthenticationModuleRoutes} from '../AuthenticationModuleRoutes';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'app/Services/AuthService/auth.service';
import {DevicesService} from 'app/Services/Devices/devices.service';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationModuleRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatIconModule
  ],
  providers: [AuthService,DevicesService],

})
export class AuthModuleModule { }
