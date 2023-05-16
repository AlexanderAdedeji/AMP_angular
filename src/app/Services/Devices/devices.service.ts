import { Injectable } from '@angular/core';
import { ErrorService } from '../../Business/error/error.service';
import { HttpErrorHandler } from '../../Business/error/http-error-handler.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { map,retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Constants } from 'app/Business/tools/constants/constants';
import { DeviceDetails } from 'app/Business/models/DeviceDetails'



@Injectable({
  providedIn: 'root'
})
export class DevicesService {
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




  /** search for callback object */
  registerDevice(data) {
    let connect = environment.baseUrl + environment.CreateNewDeviceUrl
    let header =  this.constants.httpHeader().set('enc', data)
    return this.httpClient.post(connect, '', {headers : header, responseType: 'json'})
      .pipe(map((data:DeviceDetails) => {
        return data;
      }),
        retry(3),
      );
  }




  /** get all Devices Service */
  getAllDevices(data) {
  let connect = environment.baseUrl + environment.GetAllDevicesUrl
   let header = this.constants.httpHeader().set('enc', data)
    return this.httpClient.get(connect, {headers : header, responseType: 'json'})
      .pipe(map((data:DeviceDetails) => {
        return data;
      }),
        retry(3),

        
      );

  }
  getSingleDevice(data) {
    let connect = environment.baseUrl + environment.GetSingleDevice
     let header = this.constants.httpHeader().set('enc', data)
      return this.httpClient.get(connect, {headers : header, responseType: 'json'})
        .pipe(map((data:DeviceDetails) => {
          return data;
        }),
          retry(3),
  
          
        );
  
    }



  activateDevice(data) {

  let connect = environment.baseUrl + environment.ActivateDeviceUrl
   let header = this.constants.httpHeader().set('enc', data)
    return this.httpClient.post(connect,'', {headers : header, responseType: 'json'})
      .pipe(map((data:DeviceDetails) => {
        return data;
      }),
        retry(3),

        
      );
  
  }
  DeactivateDevice(data) {

  let connect = environment.baseUrl + environment.DeActivateDeviceUrl
   let header = this.constants.httpHeader().set('enc', data)
    return this.httpClient.post(connect,'', {headers : header, responseType: 'json'})
      .pipe(map((data:DeviceDetails) => {
        return data;
      }),
        retry(3),

        
      );
  
  }
  assignDevicetoAgentEmployees(data) {
  
  let connect = environment.baseUrl + environment.assignDeviceToAgentEmployeeUrl
   let header = this.constants.httpHeader().set('enc', data)
   return this.httpClient.post(connect, '',{headers : header, responseType: 'json'})
      .pipe(map((data:DeviceDetails) => {
        return data;
      }),
        retry(3),
      );

      
  }
  unAssignAgentEmployeesFromDevice(data) {
  let connect = environment.baseUrl + environment.unAssignAgentEmployeeFromDeviceUrl
   let header = this.constants.httpHeader().set('enc', data)
    return this.httpClient.post(connect, '',{headers : header, responseType: 'json'})
      .pipe(map((data:DeviceDetails) => {
        return data;
      }),
        retry(3),

        
      );

    } 
  Delete(data) {
  let connect = environment.baseUrl + environment.DeleteDeviceUrl
   let header = this.constants.httpHeader().set('enc', data)
    return this.httpClient.delete(connect,{headers : header, responseType: 'json'})
      .pipe(map((data:DeviceDetails) => {
        return data;
      }),
        retry(3),

        
      );

      
  }




//LA0130065131



}
