import { Injectable } from '@angular/core';

@Injectable()

export class Eliezie {
    // protected hezekaih = 'http://www.elor.com.ng/'; // Proxy Endpoint
    protected hezekaih = 'https://getbible.net/'; // Proxy Endpoint
    // protected hezekaih = '/bankPath/'; // Proxy Endpoint

    constructor( ) {}
    // Testurl() {
    //     return this.hezekaih;
    // }

    Mainurl() {
        return this.hezekaih;
    }


   
}

