import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworAvailabilityService {

  constructor() {  
    this.Offline();
    this.online();
  }


  Offline() {
    window.addEventListener('offline', function(e) {  this.alert('No Network available');   });
  }
  online() {
    window.addEventListener('online', function(e) { this.alert('Network is now available'); });
    
  }

  networkStatusManualCheck() {
      return window.navigator.onLine;
  }
}
