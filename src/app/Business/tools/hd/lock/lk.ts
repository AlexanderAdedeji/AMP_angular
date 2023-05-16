import { Injectable } from '@angular/core';
import { Eliezie} from '../lock/el';
import {  HttpClient } from '@angular/common/http';

@Injectable()

/***
 * This is the class that contains all endpoints .
 * All class which uses endpoints inherit this class.
 */
export class Url extends Eliezie {
    // Use this if you are on live server and not want to run in apk
    protected sampleUrl= super.Mainurl();

    // protected SMSUrl = super.smsApi();
    // Use this if you are on localS server
    // sampleUrl: string = "sampleUrl";
    constructor() {
        super();
    }

    /**
     * Method that contain endpoints which authenticates staff login.
     */
  

    // protected SMSServer() {
    //     let msgUrl = this.SMSUrl;
    //     return msgUrl;
    // }
   
}