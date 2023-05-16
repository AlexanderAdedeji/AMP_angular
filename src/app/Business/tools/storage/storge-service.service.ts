
import { Injectable } from '@angular/core';
declare var w : Window;

@Injectable({
  providedIn: 'root'
})

export class StorageService {

token :string
UserType : any;
email : string;
authenticatedUserDetails:any;
agentName:string;
agentId:any;
AllAgentsData : any;
AllUsersData:any;
AllAgentManagersData:any
AllAgentSupervisorsData:any
AllAgentUsersData:any;
AllDeviceData:any;
Agent:any;
AllUserTypes:any;
FullAgentsDetails:any;
Device:any;
searchedUser:string;


}
