import { Injectable } from '@angular/core';
import { ErrorService } from '../../Business/error/error.service';
import { HttpErrorHandler } from '../../Business/error/http-error-handler.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { map,retry } from 'rxjs/operators';
import { environment } from '../.././../environments/environment';
import { Constants } from 'app/Business/tools/constants/constants';
import { AuthUserDetails } from 'app/Business/models/UserDetails';
import { AgentFullDetailsModel } from 'app/Business/models/agentFullDetailsModel';
import { AgentDetails } from 'app/Business/models/agentDetails';


@Injectable({
  providedIn: 'root'
})
export class AgentsService {
  public httpErrorHandler: HttpErrorHandler;
  public const: any;
  public theHeader: any;

  
  public errorHandle: any;
  public errorService: ErrorService;
  constructor(
                public httpClient: HttpClient, 
                public constants: Constants,
  ) { 

    this.httpErrorHandler = new HttpErrorHandler(this.errorService);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
  }







  
  /** search for callback object */
  registerAgentUser(data,token) {
    let connect = environment.baseUrl + environment.AgentsUrl + environment.CreateNewAgentUserUrl
    let header =  this.constants.httpHeader().set('enc', data)
   //this.constants.httpHeader().set('token', token)
   //let header = this.constants.httpHeader();
    return this.httpClient.post(connect, '', {headers : header, responseType: 'json'})
      .pipe(map((data:AuthUserDetails) => {
        return data;
      }),
        retry(3),
      );
  }







  registerAgents(value) {
    let data = value
    let connect = environment.baseUrl + environment.CreateNewAgentUrl
    let header =  this.constants.httpHeader().set('enc', data)
    return this.httpClient.post(connect, '', {headers : header, responseType: 'json'})
      .pipe(map((data:AgentDetails) => {
        return data;
      }),
        // retry(3),
      ); 
  }









  /** get all agents Service */
  getAllAgents(data) {

    let connect = environment.baseUrl + environment.AgentsUrl 
   let header = this.constants.httpHeader().set('enc', data)
    return this.httpClient.get(connect, {headers : header, responseType: 'json'})
      .pipe(map((data:AuthUserDetails) => {
        return data;
      }),
        retry(3),

        
      );
  }





  
  /** get all managers Service */
  getAllManagers(data) {

    let connect = environment.baseUrl + environment.GetAllMangers
   let header = this.constants.httpHeader().set('enc', data)
    return this.httpClient.get(connect, {headers : header, responseType: 'json'})
      .pipe(map((data:AuthUserDetails) => {
        return data;
      }),
        retry(3),

        
      );
  }

    /** get all managers Service */
    getAllSupervisor(data) {

      let connect = environment.baseUrl + environment.GetAllSupervisors
     let header = this.constants.httpHeader().set('enc', data)
      return this.httpClient.get(connect, {headers : header, responseType: 'json'})
        .pipe(map((data:AuthUserDetails) => {
          return data;
        }),
          retry(3),
  
          
        );
    }
  









  /** get all agents Service */
  getAgentFullDetails(data){
    let connect = environment.baseUrl + environment.AgentFullDetails
   let header = this.constants.httpHeader().set('enc', data)
    return this.httpClient.get(connect, {headers : header, responseType: 'json'})
      .pipe(map((data: AgentFullDetailsModel) => {
        return data;
      }),
        retry(3),

        
      );
  }

    /** get all agents Service */
    // getAllAgentsUsers(data) {
    //   let connect = environment.baseUrl + environment.AgentsUrl + environment.GetAllAgentUserUrl
    //  let header = this.constants.httpHeader().set('enc', data)
    //   return this.httpClient.get(connect, {headers : header, responseType: 'json'})
    //     .pipe(map((data:AuthUserDetails) => {
    //       return data;
    //     }),
    //       retry(3),
    //     );
    // }
}
