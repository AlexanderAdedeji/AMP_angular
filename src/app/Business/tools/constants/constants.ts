import { HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { Observable } from "rxjs";

export class Constants {
  // headers
  httpHeader() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "",
      "enc" : "",
      "Access-Control-Allow-Origin": "*",
        });
    return headers;
  }


 


  alertValues() {
    const value = {
      successIcon: 'success',
      successTitleText : 'Successful',
      InfoText : 'Info',

      titleData : '',

      failiureIcon: 'error',
      failiureTitleText : 'Error',

      warningIcon : 'warning',
      infoIcon : 'info',
      questionIcon : 'question',

      timer : 6000,
      footer : ``
    }
    return value;
  }
  

   /** General Strings */
   generalStrings() {
    const strings = {
      successResonse : 'Successful',
      errorResponse : 'Error',
      successfulRegistration : 'You have succuessfully onboarded'
    };
    return strings;
  }

  /** getting the errormessages of the forms */
  forErrorMessages() {
    const validationMessages = {
      userName: [
        { type: 'required', message: 'User Name is required.' },
        { type: 'pattern', message: 'User Name must be a valid email.' }
      ],
      password: [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be at least 5 characters long.' }
      ],
      confirmPassword: [
        { type: 'required', message: 'Confirm Password is required.' },
        { type: 'minlength', message: 'Confirm Password must be at least 5 characters long.' }
      ],
      mobileNumber: [
        { type: 'required', message: 'Mobile Number  is required.' },
        { type: 'minlength', message: 'Mobile Number must be at least 11 numbers long.' }
      ],
      clientName: [
        { type: 'required', message: 'Name is required.' },
        { type: 'minlength', message: 'Name must be at least 3 characters long.' }
      ],
      clientID: [
        { type: 'required', message: 'Client Id is required.' },
        { type: 'minlength', message: 'client Id must be at least 10 characters long.' }
      ],
      companyName: [
        { type: 'required', message: 'Company Name is required.' },
        { type: 'minlength', message: 'Company Name must be at least 2 characters long.' }
      ],
      companyEmail: [
        { type: 'required', message: 'Company Email is required.' },
        { type: 'pattern', message: 'Enter a valid email.' }
      ],
      firstName: [
        { type: 'required', message: 'First Name is required.' },
        { type: 'minlength', message: 'First Name must be at least 3 characters long.' }
      ],
      lastName: [
        { type: 'required', message: 'Last Name is required.' },
        { type: 'minlength', message: 'Last Name must be at least 3 characters long.' }
      ],
      storeAddress: [
        { type: 'required', message: 'Store Address is required.' },
        { type: 'minlength', message: 'Store Address must be at least 8 characters long.' }
      ],
      state: [
        { type: 'required', message: 'State is required.' },
        { type: 'minlength', message: 'State must be at least 2 characters long.' }
      ],
      lga: [
        { type: 'required', message: 'Local Govt is required.' },
        { type: 'minlength', message: 'Local Govt must be at least 2 characters long.' }
      ],
      city: [
        { type: 'required', message: 'City is required.' },
        { type: 'minlength', message: 'City must be at least 2 characters long.' }
      ],
      accountNo: [
        { type: 'required', message: 'Account Number is required.' },
        { type: 'minlength', message: 'Account Number must be at least 10 characters long.' },
        { type: 'maxlength', message: 'Account Number must be 10 characters in length.' },
        { type: 'pattern', message: 'Account Number can only be numeric.' }
      ],
      NameOnCard : [
        { type: 'required', message: 'Name On card is required.' },
        { type: 'minlength', message: 'Name on card must be at least 10 characters long.' },
        { type: 'maxlength', message: 'Name on card must be 10 characters in length.' },
        { type: 'pattern', message: 'Name on card cannot contain special charcters or Double Spaces.' }
      ],
      Address : [
        { type: 'required', message: 'Address is required.' },
        { type: 'minlength', message: 'Address must be at least 10 characters long.' },
        { type: 'maxlength', message: 'Address must be 10 characters in length.' },
        { type: 'pattern', message: 'Address cannot contain special charcters or Double Spaces.' }
     
      ]
      
     };
    return validationMessages;
  }
  

  getTitle() {
    const title = ["Mr", "Mrs", "Miss", "Master"];
    return title;
  }



  // responses

  getAllresponses() {
    const responses = {
    
    };
    return responses;
  }


  // loading constants
  getLoaderMatters() {
    const imageUrl = {
      spinnerHide: 'hide',
      spinnerShow: 'show',
      spinnerBubble: 'bubbles',
      spinnerLines: 'lines',
      // spinnerLines-small: 'lines-small',
      spinnerCircles: 'circles',
      spinnerCrescent: 'crescent',
      spinnerDots:  'dots',
      durationDefault: 5000,
      durationMoreTime: 7000,
      signupmsg : ' Registering....',
      imageLoadsucces : ' Image was updated successfully',
      waiting : 'Please wait...',
      login : ' logging in....',
      uploadImage : ' Uploading Image....',
      displayingImage : ' Displaying new Image....',
      successRegistration : 'Your account has been created. Please log in.',
      loading :'loading.....'
    };
    return imageUrl;
  }


  getAlluserTypes() {
    const userTypes =   {
      "REGULAR":"1",
      "SUPERUSER":"3",
      "AGENT":"4",
      "AGENT_EMPLOYEE_TYPE":"5",

    }
      
    ;
    return userTypes;
  }

 

 
}
