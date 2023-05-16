import { Injectable } from '@angular/core';
// import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
// import { Keepalive } from '@ng-idle/keepalive';
import { Constants } from '../../tools/constants/constants';


@Injectable({
    providedIn: 'root'
  })

  export class SessionManager {
//     idleState = 'Not started.';
//     timedOut = false;
//     lastPing?: Date = null;
//     title = 'angular-idle-timeout';
//       constructor(private idle: Idle, private keepalive: Keepalive,
//         public constant : Constants) {}


//     session() {
//            // sets an idle timeout of 5 seconds, for testing purposes.
//     this.idle.setIdle(5);
//     // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
//     this.idle.setTimeout(300);
//     // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
//     this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

//     this.idle.onIdleEnd.subscribe(() => { 
//       this.idleState = 'No longer idle.'
//       // console.log(this.idleState);
//       this.reset();
//     });
    
//     this.idle.onTimeout.subscribe(() => {
//       this.idleState = 'Timed out!';
//       this.timedOut = true;
//       // console.log(this.idleState);
//       // const logout = this.constant.EndpointUrls().logoutBaseUrl + this.constant.EndpointUrls().logoutPath;
//       // window.location.href =  logout
//     });
    
//     this.idle.onIdleStart.subscribe(() => {
//         this.idleState = 'You\'ve gone idle!'
//         // console.log(this.idleState);
//         // this.childModal.show();
//     });
    
//     this.idle.onTimeoutWarning.subscribe((countdown) => {
//       this.idleState = 'You will time out in ' + countdown + ' seconds!'
//       // console.log(this.idleState);
//     });

//     // sets the ping interval to 15 seconds
//     this.keepalive.interval(15);

//     this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

//     this.reset();
//     }

// /** reset */
//     reset() {
//         this.idle.watch();
//         this.idleState = 'Started.';
//         this.timedOut = false;
//       }
  }