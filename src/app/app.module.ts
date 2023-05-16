import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';


import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import {MatIconModule} from '@angular/material/icon'

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthModuleModule } from './Authentication/auth-module/auth-module.module';
import {  SharedModule} from "./Business/Shared/sharedModule/sharedModule";
import { LoaderService } from './Services/loader/loader.service';
import { LoaderComponent } from './Business/Components/loader/loader/loader.component';
import { DevicesComponent } from './pages/DeviceFolder/devices/devices.component';
import { AgentDetatilsComponent } from './pages/AgentFullDetails/agent-detatils/agent-detatils.component';
import { AgentAdminsComponent } from './pages/AgentFullDetails/agent-admins/agent-admins/agent-admins.component';
import { AgentDevicesComponent } from './pages/AgentFullDetails/agent-devices/agent-devices/agent-devices.component';
import { AgentUsersComponent } from './pages/AgentFullDetails/agent-users/agent-users/agent-users.component';
import { AgentProfileComponent } from './pages/AgentFullDetails/agent-profile/agent-profile.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { AgentManagerComponent } from "./pages/AgentFullDetails/agent-manager/agent-manager.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { SearchComponent } from "./pages/search/search.component";
import { UserFullDetailsComponent } from './pages/user-full-details/user-full-details.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoaderComponent,
    DevicesComponent,
    AgentDetatilsComponent,
    AgentAdminsComponent,
    AgentDevicesComponent,
    AgentUsersComponent,
    AgentProfileComponent,
    EditProfileComponent,
    AgentManagerComponent,
    SearchComponent,
    UserFullDetailsComponent,
 

    
    
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    NgbModule,
    
    BrowserModule,
    MatIconModule,
    RouterModule.forRoot(AppRoutes,{
    useHash: true,
    relativeLinkResolution: 'legacy'
}),
    SidebarModule,
    FormsModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    AuthModuleModule,
    SharedModule,
    MatIconModule
  ],
  providers: [LoaderService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
