import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncodeAESService } from 'app/Business/AES/aes';
import { AlertService } from 'app/Business/tools/alert/alert.service';
import { Constants } from 'app/Business/tools/constants/constants';
import { StorageService } from 'app/Business/tools/storage/storge-service.service';
import { AgentsService } from 'app/Services/Agents/agents.service';
import { AuthService } from 'app/Services/AuthService/auth.service';
import { DevicesService } from 'app/Services/Devices/devices.service';
import { LoaderService } from 'app/Services/loader/loader.service';
import { UserTypesService } from 'app/Services/UserTypes/userTypes.service';
import Chart from 'chart.js';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls:['./dashboard.component.css']
})



export class DashboardComponent implements OnInit{
  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public isManager: boolean;
  public isSuperUser:boolean;
  public isAgent: boolean;


  constructor(private authService: AuthService,
    private agentsService: AgentsService,
    private devicesService: DevicesService,
    private router: Router,
    private userTypes: UserTypesService,
    public constants: Constants,
    public storageService: StorageService,
    public loaderService: LoaderService,
    public encodeAESService: EncodeAESService,
    public alertService: AlertService) {
 
      this.checkUser();  
      this.check();

   

  }
    ngOnInit(){
      this.chartColor = "#FFFFFF";

      this.canvas = document.getElementById("chartHours");
      this.ctx = this.canvas.getContext("2d");

      this.chartHours = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
          datasets: [{
              borderColor: "#6bd098",
              backgroundColor: "#6bd098",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
            },
            {
              borderColor: "#f17e5d",
              backgroundColor: "#f17e5d",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
            },
            {
              borderColor: "#fcc468",
              backgroundColor: "#fcc468",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
            }
          ]
        },
        options: {
          legend: {
            display: false
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5,
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }]
          },
        }
      });


      // this.canvas = document.getElementById("chartEmail");
      // this.ctx = this.canvas.getContext("2d");
      // this.chartEmail = new Chart(this.ctx, {
      //   type: 'pie',
      //   data: {
      //     labels: [1, 2, 3],
      //     datasets: [{
      //       label: "Emails",
      //       pointRadius: 0,
      //       pointHoverRadius: 0,
      //       backgroundColor: [
      //         '#e3e3e3',
      //         '#4acccd',
      //         '#fcc468',
      //         '#ef8157'
      //       ],
      //       borderWidth: 0,
      //       data: [342, 480, 530, 120]
      //     }]
      //   },

      //   options: {

      //     legend: {
      //       display: false
      //     },

      //     pieceLabel: {
      //       render: 'percentage',
      //       fontColor: ['white'],
      //       precision: 2
      //     },

      //     tooltips: {
      //       enabled: false
      //     },

      //     scales: {
      //       yAxes: [{

      //         ticks: {
      //           display: false
      //         },
      //         gridLines: {
      //           drawBorder: false,
      //           zeroLineColor: "transparent",
      //           color: 'rgba(255,255,255,0.05)'
      //         }

      //       }],

      //       xAxes: [{
      //         barPercentage: 1.6,
      //         gridLines: {
      //           drawBorder: false,
      //           color: 'rgba(255,255,255,0.1)',
      //           zeroLineColor: "transparent"
      //         },
      //         ticks: {
      //           display: false,
      //         }
      //       }]
      //     },
      //   }
      // });

      // var speedCanvas = document.getElementById("speedChart");

      // var dataFirst = {
      //   data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
      //   fill: false,
      //   borderColor: '#fbc658',
      //   backgroundColor: 'transparent',
      //   pointBorderColor: '#fbc658',
      //   pointRadius: 4,
      //   pointHoverRadius: 4,
      //   pointBorderWidth: 8,
      // };

      // var dataSecond = {
      //   data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
      //   fill: false,
      //   borderColor: '#51CACF',
      //   backgroundColor: 'transparent',
      //   pointBorderColor: '#51CACF',
      //   pointRadius: 4,
      //   pointHoverRadius: 4,
      //   pointBorderWidth: 8
      // };

      // var speedData = {
      //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      //   datasets: [dataFirst, dataSecond]
      // };

      // var chartOptions = {
      //   legend: {
      //     display: false,
      //     position: 'top'
      //   }
      // };

      // var lineChart = new Chart(speedCanvas, {
      //   type: 'line',
      //   hover: false,
      //   data: speedData,
      //   options: chartOptions
      // });
    }



    checkUser(){

      const userType= JSON.parse(sessionStorage.getItem('user')).user_type.name

      if(userType === "SUPERUSER"){
        this.isSuperUser = true;
        this.GetAllDevices();
        this.GetAllAgents();
        // this.GetAllAgentUsers();
        this.GetAllUserTypes();
        this.GetAllUsers()
   
        this.isManager=false;
      }else if (userType === "AGENT_MANAGER"){

          this.isSuperUser = false;
        this.GetAgentFullDetails();   
        this.GetAllUserTypes();
      
        this.isManager=true;
      }else if (userType ==="AGENT_SUPERVISOR"){
        this.GetAgentFullDetails();  
      }

      
    }


  /**
   * 
   *  Routes
   */


   Agents(){
    this.router.navigate(['AMP/allAgents']);
   }
   Officers(){
    this.router.navigate(['AMP/officers/allofficers']);
   }
   Devices(){
    this.router.navigate(["AMP/alldevices"])
   }

   Supervisors(){
    this.router.navigate(["AMP/supervisors/allSupervisors"])
   }
   Managers(){
    this.router.navigate(["AMP/managers/allManagers"])
   }

   check(){
    const Authuser = JSON.parse(sessionStorage.getItem('user')).email
  }


    /**
   * 
   *  Routes
   */




 /**
   * 
   *  Get All Agents
   */

  
    GetAllAgents(){

 
      let value = {
        token :  ''
      };
 
      value.token = 'Token ' + JSON.parse(sessionStorage.getItem('user')).token
      if(!value.token){
        value.token =
          "Token " + JSON.parse(sessionStorage.getItem("user")).token;
      }
      const newValue = this.encodeAESService.encryptData(value)
      this.loaderService.show();
    
      this.agentsService.getAllAgents(newValue)
        .subscribe((res: any) => {
          var response = JSON.parse(res.response);
          if (res.status != 200 && res.status != 0) {
           
            if(response.errors[0].msg != undefined || response.errors[0].msg != null)this.alertService.basicAlert("Error", response.errors[0].msg, 'error');
            if(response.errors[0].message != undefined || response.errors[0].message != null)this.alertService.basicAlert("Error", response.errors[0].message, 'error');
            this.loaderService.hide();
    
            return;
          }
          if (res.status == 200) {
            
            var response = JSON.parse(res.response);
            this.storageService.AllAgentsData = response;
            this.loaderService.hide();
    
          } else {
            this.alertService.basicAlert("Error", response.errors[0].message, 'info');

            this.loaderService.hide();
    
          }
    
    
        })
    
    }


    GetAllUsers(){
      let value = {
        token : '',
      };

      value.token =  'Token ' + JSON.parse(sessionStorage.getItem('user')).token;
            if (!value.token) {
              value.token =
                "Token " + JSON.parse(sessionStorage.getItem("user")).token;
            }

      const newValue = this.encodeAESService.encryptData(value)
      this.loaderService.show();
      this.authService.getAllUsers(newValue)
        .subscribe((res: any) => {
        
          var response = JSON.parse(res.response);
          if (res.status != 200 && res.status != 0) {
           
            if(response.errors[0].msg != undefined || response.errors[0].msg != null)this.alertService.basicAlert("Error", response.errors[0].msg, 'error');
            if(response.errors[0].message != undefined || response.errors[0].message != null)this.alertService.basicAlert("Error", response.errors[0].message, 'error');
            this.loaderService.hide();
    
            return;
          }
          if (res.status == 200) {
            var response = JSON.parse(res.response);
            this.loaderService.hide();
            this.storageService.AllUsersData=response.filter(user=>user.email !== this.storageService.email)
   
    
          } else {
            this.alertService.basicAlert("Error", response.errors[0].message, 'info');
  
            this.loaderService.hide();
    
          }
    
    
        })
    
    }
    

    
    
 /**
   * 
   *  Get All Agents
   */


  /**
   * 
   *  Get All Managers
   */

  
   GetAllManagers(){
    let value = {
      token : ''
    };
    value.token = 'Token ' + JSON.parse(sessionStorage.getItem('user')).token;
          if (!value.token) {
            value.token =
              "Token " + JSON.parse(sessionStorage.getItem("user")).token;
          }

    const newValue = this.encodeAESService.encryptData(value)
    this.loaderService.show();
  
    this.agentsService.getAllManagers(newValue)
      .subscribe((res: any) => {
        var response = JSON.parse(res.response);
        if (res.status != 200 && res.status != 0) {
         
          if(response.errors[0].msg != undefined || response.errors[0].msg != null)this.alertService.basicAlert("Error", response.errors[0].msg, 'error');
          if(response.errors[0].message != undefined || response.errors[0].message != null)this.alertService.basicAlert("Error", response.errors[0].message, 'error');
          this.loaderService.hide();
  
          return;
        }
        if (res.status == 200) {
          
          var response = JSON.parse(res.response);
          this.storageService.AllAgentManagersData = response;
          this.loaderService.hide();
  
        } else {
          this.alertService.basicAlert("Error", response.errors[0].message, 'info');
          this.loaderService.hide();
  
        }
  
  
      })
  
  }

  
/**
 * 
 *  Get All Agent's Managers
 */






  /**
   * 
   *  Get All Managers
   */

  
   GetAllSupervisors (){
    let value = {
      token : ''
    };
   value.token = 'Token ' + JSON.parse(sessionStorage.getItem('user')).token;
         if (!value.token) {
           value.token =
             "Token " + JSON.parse(sessionStorage.getItem("user")).token;
         }

    const newValue = this.encodeAESService.encryptData(value)
    this.loaderService.show();
  
    this.agentsService.getAllSupervisor(newValue)
      .subscribe((res: any) => {
        var response = JSON.parse(res.response);
        if (res.status != 200 && res.status != 0) {
         
          if(response.errors[0].msg != undefined || response.errors[0].msg != null)this.alertService.basicAlert("Error", response.errors[0].msg, 'error');
          if(response.errors[0].message != undefined || response.errors[0].message != null)this.alertService.basicAlert("Error", response.errors[0].message, 'error');
          this.loaderService.hide();
  
          return;
        }
        if (res.status == 200) {
          
          var response = JSON.parse(res.response);
          this.storageService.AllAgentSupervisorsData = response;
          this.loaderService.hide();
  
        } else {
          this.alertService.basicAlert("Error", response.errors[0].message, 'info');

          this.loaderService.hide();
  
        }
  
  
      })
  
  }

  
/**
 * 
 *  Get All Agent's Supervisors
 */






  /**
   * 
   *  GET ALL Information About An Agent
   */

      GetAgentFullDetails(){ 
        let value = {
          token : '',
          agent_id: JSON.parse(sessionStorage.getItem('user')).agent_id
        };
        value.token =   'Token ' + JSON.parse(sessionStorage.getItem('user')).token;
              if (!value.token) {
                value.token =
                  "Token " + JSON.parse(sessionStorage.getItem("user")).token;
              }

        const newValue = this.encodeAESService.encryptData(value)
        this.loaderService.show();
        this.agentsService.getAgentFullDetails(newValue)
          .subscribe((res: any) => {
          
            var response = JSON.parse(res.response);
            if (res.status != 200 && res.status != 0) {
             
              if(response.errors[0].msg != undefined || response.errors[0].msg != null)this.alertService.basicAlert("Error", response.errors[0].msg, 'error');
              if(response.errors[0].message != undefined || response.errors[0].message != null)this.alertService.basicAlert("Error", response.errors[0].message, 'error');
              this.loaderService.hide();
      
              return;
            }
            if (res.status == 200) {
              var response = JSON.parse(res.response);
              this.storageService.FullAgentsDetails= response;

              if(this.storageService.UserType=='AGENT_MANAGER'){
                this.storageService.AllUsersData =this.storageService.FullAgentsDetails.employees
              }else{
                this.storageService.AllUsersData = this.storageService.FullAgentsDetails.employees.filter(employees=> employees.user_type.name == 'AGENT_OFFICER')

                
              }  
              this.storageService.AllAgentUsersData = this.storageService.FullAgentsDetails.employees.filter(employees=> employees.user_type.name == 'AGENT_OFFICER')
              this.storageService.AllAgentManagersData = this.storageService.FullAgentsDetails.employees.filter(employees=> employees.user_type.name == 'AGENT_MANAGER' && employees.email !== this.storageService.email)
              this.storageService.AllAgentSupervisorsData = this.storageService.FullAgentsDetails.employees.filter(employees=> employees.user_type.name == 'AGENT_SUPERVISOR' && employees.email !== this.storageService.email)
              this.storageService.AllDeviceData = this.storageService.FullAgentsDetails.devices
              this.loaderService.hide();

      
            } else {
              this.alertService.basicAlert("Error", response.errors[0].message, 'info');
 
              this.loaderService.hide();
      
            }
      
      
          })
      
      }
    
  /**
   * 
   *  GET ALL Information About An Agent
   */



    /**
   * 
   *  GET ALL Users Created Under An Agent
   */

    GetAllAgentUsers(){

      let value = {
        token : '',
      };
      value.token = 'Token ' + JSON.parse(sessionStorage.getItem('user')).token;
            if (!value.token) {
              value.token =
                "Token " + JSON.parse(sessionStorage.getItem("user")).token;
            }

      const newValue = this.encodeAESService.encryptData(value)
      this.loaderService.show();    
      this.authService.getAllAgentsUsers(newValue)
        .subscribe((res: any) => {
          
          var response = JSON.parse(res.response);
          if (res.status != 200 && res.status != 0) {
           
            if(response.errors[0].msg != undefined || response.errors[0].msg != null)this.alertService.basicAlert("Error", response.errors[0].msg, 'error');
            if(response.errors[0].message != undefined || response.errors[0].message != null)this.alertService.basicAlert("Error", response.errors[0].message, 'error');
            this.loaderService.hide();
    
            return;
          }
          if (res.status == 200) {
            var response = JSON.parse(res.response);
            this.storageService.AllAgentUsersData= response;
            this.loaderService.hide();
    
          } else {
            this.alertService.basicAlert("Error", response.errors[0].message, 'info');
    
            this.loaderService.hide();
    
          }
    
    
        })
    
    }



/**
   * 
   *  GET ALL Users Created Under An Agent
*/




/**
   * 
   *  GET ALL Devices in the DB
*/

    GetAllDevices(){
      let value = {
        token : ''
      };
      value.token =  'Token ' + JSON.parse(sessionStorage.getItem('user')).token;
            if (!value.token) {
              value.token =
                "Token " + JSON.parse(sessionStorage.getItem("user")).token;
            }

      const newValue = this.encodeAESService.encryptData(value)
      this.loaderService.show();
    
      this.devicesService.getAllDevices(newValue)
        .subscribe((res: any) => {
        
         
          var response = JSON.parse(res.response);
          if (res.status != 200 && res.status != 0) {
           
            if(response.errors[0].msg != undefined || response.errors[0].msg != null)this.alertService.basicAlert("Error", response.errors[0].msg, 'error');
            if(response.errors[0].message != undefined || response.errors[0].message != null)this.alertService.basicAlert("Error", response.errors[0].message, 'error');
            this.loaderService.hide();
    
            return;
          }
          if (res.status == 200) {
           
            var response = JSON.parse(res.response);
            this.storageService.AllDeviceData= response;
            this.loaderService.hide();
    
          } else {
            this.alertService.basicAlert("Error", response.errors[0].message, 'info');
      
            this.loaderService.hide();
    
          }
    
    
        })
    
    }



/**
   * 
   *  GET ALL Devices in the DB
*/




/**
   * 
   *  GET ALL UserTypes in the DB
*/

    GetAllUserTypes(){
 
      let value = {
        token : ''
      };
      // value.token = this.storageService.token;
      value.token = 'Token ' + JSON.parse(sessionStorage.getItem('user')).token;
            if (!value.token) {
              value.token =
                "Token " + JSON.parse(sessionStorage.getItem("user")).token;
            }

       const userType = JSON.parse(sessionStorage.getItem("user")).user_type
         .name;

      const newValue = this.encodeAESService.encryptData(value)
      this.loaderService.show();
      this.userTypes.getAllUserTypes(newValue)
          .subscribe((res: any) => {
        
            var response = JSON.parse(res.response);
                  if (res.status != 200 && res.status != 0) {
                   
                    if(response.errors[0].msg != undefined || response.errors[0].msg != null)this.alertService.basicAlert("Error", response.errors[0].msg, 'error');
                    if(response.errors[0].message != undefined || response.errors[0].message != null)this.alertService.basicAlert("Error", response.errors[0].message, 'error');
                    this.loaderService.hide();
            
                    return;
                  }
                  if (res.status == 200) {

                    var response = JSON.parse(res.response);
                    this.storageService.AllUserTypes= response;
                    this.loaderService.hide();
            
                  }
                   else {
                    this.alertService.basicAlert("Error", response.errors[0].message, 'info');
                    this.loaderService.hide();
         
            
                  }

          })
    }

    
}
