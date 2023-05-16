import { Injectable } from '@angular/core';
import { ErrorService } from '../../Business/error/error.service';
import { HttpErrorHandler } from '../../Business/error/http-error-handler.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { map,retry } from 'rxjs/operators';
import { environment } from '../.././../environments/environment';
import { Constants } from 'app/Business/tools/constants/constants';
import { AuthUserDetails } from 'app/Business/models/UserDetails';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public httpErrorHandler: HttpErrorHandler;
  public const: any;
  public theHeader: any;
  public errorHandle: any;
  public errorService: ErrorService;
  

  constructor(  public httpClient: HttpClient, 
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

  /** Login Service */
  loginUser(data) {
    //let connect = environment.baseUrl + environment.authUrl + environment.loginUrl
    let connect = environment.baseUrl + environment.authUrl + environment.loginUrl
   let header = this.constants.httpHeader().set('enc', data)
   
    return this.httpClient.post(connect, '', {headers : header, responseType: 'json'})
      .pipe(map((data:AuthUserDetails) => {
        return data;
      //  return JSON.parse(data);
      }),
        retry(3),
      );
  }

 


  
  // log user out 
  logoutUser(data) {
    let connect = environment.baseUrl + environment.authUrl + environment.logout
   
    return this.httpClient.post(connect, data)
      .pipe(map((data) => {
        return data;
      }),
        retry(3),
      );
  }
//LA0130065131


getAllAgentsUsers(data) {
  let connect =environment.baseUrl + environment.GetAllAgentUserUrl
 let header = this.constants.httpHeader().set('enc', data)
  return this.httpClient.get(connect, {headers : header, responseType: 'json'})
    .pipe(map((data:AuthUserDetails) => {
      return data;
    }),
      retry(3),
    );
}


activateUser(data) {

let connect = environment.baseUrl + environment.ActivateAgentUserUrl
 let header = this.constants.httpHeader().set('enc', data)
  return this.httpClient.get(connect, {headers : header, responseType: 'json'})
    .pipe(map((data:AuthUserDetails) => {
      return data;
    }),
      retry(3),

      
    );

}


getSingleUser(data){
  let connect = environment.baseUrl + environment.getSingleUser
  let header = this.constants.httpHeader().set('enc', data)
  return this.httpClient.get(connect, {headers: header, responseType: 'json'})
  .pipe(map((data:AuthUserDetails) =>{
    return data;
  }),
    retry(3)
  )

}


DeactivateUser(data) {

let connect = environment.baseUrl + environment.DeActivateAgentUserUrl
 let header = this.constants.httpHeader().set('enc', data)
  return this.httpClient.get(connect, {headers : header, responseType: 'json'})
    .pipe(map((data:AuthUserDetails) => {
      return data;
    }),
      retry(3),

      
    );

}


getAllUsers(data) {

  let connect = environment.baseUrl + environment. GetAllUser
  let header = this.constants.httpHeader().set('enc', data)
  return this.httpClient.get(connect, {headers : header, responseType: 'json'})
    .pipe(map((data:AuthUserDetails) => {
      return data;
    }),
      retry(3),

      
    );
}
RequestPasswordReset(data) {
  let connect = environment.baseUrl + environment.RequestPasswordReset
  let header = this.constants.httpHeader().set('enc', data)
  return this.httpClient.get(connect, {headers : header, responseType: 'json'})
    .pipe(map((data:AuthUserDetails) => {
      return data;
    }),
      retry(3),

      
    );
}








registerAgentUser(data) {
 
  let connect = environment.baseUrl + environment.CreateNewAgentUserUrl
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


registerAgentManager(data) {

  let connect = environment.baseUrl + environment.CreateNewAgentManagerUrl
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
}
