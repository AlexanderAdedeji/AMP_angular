import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { DevicesComponent } from '../../pages/DeviceFolder/devices/devices.component';
import { AgentsComponent } from '../../pages/AgentFolder/agents/agents.component';
import { UsersComponent } from 'app/Authentication/UsersFolder/users/users.component';
import {  AllUsersComponent} from 'app/Authentication/UsersFolder/all-users/all-users.component';
import { AddAgentComponent } from 'app/pages/AgentFolder/add-agent/add-agent.component';
import { AllAgentsComponent } from 'app/pages/AgentFolder/all-agents/all-agents.component';
import { AddDeviceComponent } from 'app/pages/DeviceFolder/add-device/add-device.component';
import { AgentDetatilsComponent } from 'app/pages/AgentFullDetails/agent-detatils/agent-detatils.component';
import { AMPRouterCheckGuard } from 'app/routerGuard/amprouter-check.guard';
import { AgentUsersComponent } from 'app/pages/AgentFullDetails/agent-users/agent-users/agent-users.component';
import { AgentDevicesComponent } from 'app/pages/AgentFullDetails/agent-devices/agent-devices/agent-devices.component';
import { AgentAdminsComponent } from 'app/pages/AgentFullDetails/agent-admins/agent-admins/agent-admins.component';
import { AgentProfileComponent } from 'app/pages/AgentFullDetails/agent-profile/agent-profile.component';
import { EditProfileComponent } from 'app/pages/profile/edit-profile/edit-profile.component';
import { AllDevicesComponent } from 'app/pages/DeviceFolder/all-devices/all-devices.component';
import { AssignUserComponent } from 'app/pages/DeviceFolder/assign-user/assign-user.component';
import { DeAssignUserComponent } from 'app/pages/DeviceFolder/deAssign-user/deAssign-user.component';
import { AgentManagerComponent } from 'app/pages/AgentFullDetails/agent-manager/agent-manager.component';
import { SupervisorsComponent } from 'app/pages/SupervisorFolder/supervisors/supervisors.component';
import { AddSupervisorComponent } from 'app/pages/SupervisorFolder/add-supervisor/add-supervisor.component';
import { AllSupervisorsComponent } from 'app/pages/SupervisorFolder/all-supervisors/all-supervisors.component';
import { ManagersComponent } from 'app/pages/ManagerFolder/managers/managers.component';
import { AllManagersComponent } from 'app/pages/ManagerFolder/all-managers/all-managers.component';
import { AddManagerComponent } from 'app/pages/ManagerFolder/add-manager/add-manager.component';
import { AllOfficersComponent } from 'app/pages/OfficerFolder/all-officers/all-officers.component';
import { AddOfficerComponent } from 'app/pages/OfficerFolder/add-officers/add-officer.component';
import { OfficersComponent } from 'app/pages/OfficerFolder/officers/officers.component';
import { SearchComponent } from 'app/pages/search/search.component';
import { LoginComponent } from 'app/Authentication/login/login.component';
import { UserFullDetailsComponent } from 'app/pages/user-full-details/user-full-details.component';


export const AdminLayoutRoutes:
Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'search',      component: SearchComponent },
    // {path:'login', component:LoginComponent},
    {
        path:'agentdetails',
        component:AgentDetatilsComponent,
        children:[
            {
                path:'agentadmins',
                component:AgentAdminsComponent
            },
            {
                path:'agentprofile',
                component:AgentProfileComponent
            },
            {
                path:'agentmanager',
                component:AgentManagerComponent
            },

            {
                path:'agentdevice',
                component:AgentDevicesComponent
            },
            {
                path:'agentusers',
                component:AgentUsersComponent
            }
        ]
    },

    { path: 'devices', 
    component:  DevicesComponent,
    children:[
        {
            path:'assignUser',
            component:AssignUserComponent,
        },
        {
            path:'deAssignUser',
            component:DeAssignUserComponent,
        },

        // {
        //     path:'adddevice',
        //     component:AddDeviceComponent,
        // },

    ]
    },

    {   path: 'createDevices',  component:AddDeviceComponent,

    },
    {
        path:'alldevices',
        component:AllDevicesComponent
    },
    {               path:'deAssignUser',
    component:DeAssignUserComponent,

},
{               path:'assignUser',
component:AssignUserComponent,

},




    {
        path: 'supervisors',
        component: SupervisorsComponent,
        children: [

            {
                path: 'allSupervisors',
                component: AllSupervisorsComponent,
                
            },

            {
                path: 'el',
                children: [
                  {
                path: '',
                loadChildren: () => import('../../Business/Shared/sharedModule/sharedModule').then(m => m.SharedModule)
            
                  }
                ]
              }, 
        ]
    },

    {
        path: 'managers',
        component: ManagersComponent,
        children: [

            {
                path: 'allManagers',
                component: AllManagersComponent,
                
            },

            {
                path: 'el',
                children: [
                  {
                path: '',
                loadChildren: () => import('../../Business/Shared/sharedModule/sharedModule').then(m => m.SharedModule)
            
                  }
                ]
              }, 
        ]
    },
    {
        path: 'addManager',
        component: AddManagerComponent,
        
    },

    {
        path: 'addofficer',
        component: AddOfficerComponent,
        
    },

    {
        path: 'addSupervisor',
        component: AddSupervisorComponent,
        
    },

    {
        path:'userFullDetails',
        component: UserFullDetailsComponent
    },

    
    {
        path: 'officers',
        component: OfficersComponent,
        children: [
            {
                path: 'allofficers',
                component: AllOfficersComponent,
                
            },


            {
                path: 'el',
                children: [
                  {
                path: '',
                loadChildren: () => import('../../Business/Shared/sharedModule/sharedModule').then(m => m.SharedModule)
            
                  }
                ]
              }, 
        ]
    },
    {
        path: 'allusers',
        component: AllUsersComponent,
        
    },

    {
        path: 'users',
        component: UsersComponent,
        children: [


            {
                path: 'el',
                children: [
                  {
                path: '',
                loadChildren: () => import('../../Business/Shared/sharedModule/sharedModule').then(m => m.SharedModule)
            
                  }
                ]
              }, 
        ]
    },
    {
    //canActivate:[AMPRouterCheckGuard],
      path: 'agents',
      component: AgentsComponent,
      children: [



          
      ]
  },
  {
    path: 'addAgents',
    component: AddAgentComponent,
    
},

  {
    path: 'allAgents',
    component: AllAgentsComponent,
    
},


     { path: 'editprofile',           component:  EditProfileComponent},
    // { path: 'table',          component: TableComponent },
    // { path: 'typography',     component: TypographyComponent },
     { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent }
    
];
