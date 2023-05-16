import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'app/Business/tools/alert/alert.service';
import { StorageService } from 'app/Business/tools/storage/storge-service.service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'nc-shop', class: '' },
    { path: 'icons', title: 'Icons', icon: 'nc-diamond', class: '' },
  //  { path: 'profile', title: 'profile', icon: 'nc-diamond', class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    // { path: '/Devices',          title: 'Devices',      icon:'nc-bag-16',  class: '' },
    // { path: '/Agents',          title: 'Agents',      icon:'nc-circle-10',  class: '' },
    // { path: '/Registration',          title: 'Registration',      icon:'nc-badge',  class: '' },
    // //{ path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    // // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    // // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
    // { path: '/logout',       title: 'logout',    icon:'nc-logout',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public isSuperUser = false;
    public isManager = false;
    public isLoggedIn = false;
    logo='';
    

    ngOnInit(){
        this.authenticateCurrentUserForPages();
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    constructor(public router: Router,
        public storageService: StorageService,
        public alertService: AlertService) {
            this.getLogo()
            // this.authenticateIfLoggedIn();
    }

    // goHome() {
    //
    //     window.location.href = 'file:///Users/macbookpro/Documents/identiko/Adminportal/eStartup/index.html';
    //     //this.router.navigateByUrl('file:///Users/macbookpro/Documents/identiko/Adminportal/eStartup/index.html');
    // }





    getLogo(){
       let currentUserAgent= JSON.parse(sessionStorage.getItem('user')).agent_name
       currentUserAgent === null ? this.logo = 'LASRRA AMP': this.logo = currentUserAgent
    }

    // go to Dashboard page
    goToDashboard() {
        this.router.navigate(['AMP/dashboard']);
    }


      // go to users page
    goToOfficers() {
        this.router.navigate(['AMP/officers/allofficers']);
    }
    // go to users page
    goToSupervisors() {
        this.router.navigate(['AMP/supervisors/allSupervisors']);
    }
    // go to users page
    goToManagers() {
    this.router.navigate(['AMP/managers/allManagers']);
    }
    
        // go to Devices page
        goToUsers() {
            this.router.navigate(['AMP/allusers'])
    
        }



        

    // go to Devices page
    goToDevices() {
        this.router.navigate(['AMP/alldevices'])

    }


    goAgents(){
        this.router.navigate(['AMP/allAgents'])
        }

    //logout
    logout() {

        this.storageService.token = '';
        this.storageService.email = '';
        this.storageService.UserType = null;
        this.router.navigate(['']);
        this.alertService.basicAlert("Success", "You are successfully logged out", "success");


    }


    
    authenticateCurrentUserForPages(){ 
        // const userType: any = this.storageService.UserType; 
        const userType:any = JSON.parse(sessionStorage.getItem('user')).user_type
        this.isSuperUser = userType.name == "SUPERUSER"?  true:false;
        this.isManager = userType.name == "AGENT_MANAGER"? true : false
        
        
    }

    // authenticateIfLoggedIn(){

        
    //     const userType: any = this.storageService.UserType; 
    //     this.isLoggedIn = userType == undefined?  false:true;
    //     if(!this.isLoggedIn){
    //         this.router.navigate(['AMP/login'])
    //         this.logout()
    //     }
        
    // }






}
