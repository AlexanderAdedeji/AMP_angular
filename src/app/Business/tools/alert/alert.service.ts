import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  footer;
  icon;
  titleData;
  text;
  timer;
  showCancelButton;
  cancelButtonText;
  confirmButtonText;
  reverseButtons;
  timerProgressBar?

  constructor() { }


getAlertDate( titleData?, text?, icon?, timer?, footer?,  showCancelButton?, 
  timerProgressBar?, reverseButtons?, confirmButtonText?,cancelButtonText?
  ) {
  this.footer = footer !== undefined || footer != null ? footer : '';
  this.icon  = icon !== undefined || icon != null ? icon : '';
  this.titleData  = titleData !== undefined || titleData != null ? titleData : '';
  this.text  = text !== undefined || text != null ? text : '';
  this.timer  = timer !== undefined || timer != null ? timer : '5000';
  this.showCancelButton  = showCancelButton !== undefined || showCancelButton != null ? showCancelButton : '';
  this.cancelButtonText  = cancelButtonText !== undefined || cancelButtonText != null ? cancelButtonText : '';
  this.confirmButtonText  = confirmButtonText !== undefined || confirmButtonText != null ? confirmButtonText : '';
  this.reverseButtons  = reverseButtons !== undefined || reverseButtons != null ? reverseButtons : '';
  this.timerProgressBar  = timerProgressBar !== undefined || timerProgressBar != null ? timerProgressBar : '';


}

basicAlert(titleData?,  text?,  icon?,timer?, footer?, showCancelButton?, timerProgressBar?
   , reverseButtons?, confirmButtonText?,cancelButtonText?
   ) {
  this.getAlertDate( titleData, text, icon, timer, footer,
    showCancelButton,timerProgressBar,reverseButtons,confirmButtonText,cancelButtonText
    )
  Swal.fire({
    icon: this.icon,
    title: this.titleData ,
    text: this.text,
    showCancelButton: this.showCancelButton,
    cancelButtonText : this.cancelButtonText,
    timer:  this.timer,
    footer: this.footer,
    timerProgressBar: this.timerProgressBar,
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
  })
}



/** html basic alert  */
htmlBasicAlert(icon?, titleData?, text?,  timer?, footer?, showCancelButton?, timerProgressBar?
  , reverseButtons?, confirmButtonText?,cancelButtonText?
  ) {
 this.getAlertDate( titleData, text,  icon, timer, footer,
   showCancelButton,timerProgressBar,reverseButtons,confirmButtonText,cancelButtonText
   )
 Swal.fire({
   icon: this.icon,
   title: this.titleData ,
   html: this.text,
   showCancelButton: this.showCancelButton,
   cancelButtonText : this.cancelButtonText,
   timer:  this.timer,
   footer: this.footer,
   timerProgressBar: this.timerProgressBar,
   
 })
}





/** Sweet alert Confirm */
AlertInputConfirm(title?, input?, inputAttributes?,showCancelButton?, confirmButtonText?, showLoaderOnConfirm?)  {
  Swal.fire({
    title: 'Submit your Github username',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    html: this.text,
    showCancelButton: true,
    confirmButtonText: 'Look up',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        title: `${result.value.login}'s avatar`,
        imageUrl: result.value.avatar_url
      })
    }
  })
}


/** Swet alert confirm to do another action */

confirmAlert(title : string, text : string, icon? : SweetAlertOptions ,showCancelButton? :boolean, confirmButtonText?:string, cancelButtonText?:string, reverseButtons?: boolean) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
 return swalWithBootstrapButtons.fire({
    title: title !== undefined ? title : '' ,
    text: text != undefined? text : '',
    icon: 'warning',
    showCancelButton:  showCancelButton !== undefined ? showCancelButton : true,
    confirmButtonText:  confirmButtonText !== undefined ? confirmButtonText : 'Yes',
    cancelButtonText:  cancelButtonText !== undefined ? cancelButtonText : 'No',
    reverseButtons: reverseButtons !== undefined ? reverseButtons : true
  })
  .then((result) => {
    return result;
    // if (result.value) {
    //   swalWithBootstrapButtons.fire(
    //     'Deleted!',
    //     'Your file has been deleted.',
    //     'success'
    //   )
    // } else if (
    //   /* Read more about handling dismissals below */
    //   result.dismiss === Swal.DismissReason.cancel
    // ) {
    //   swalWithBootstrapButtons.fire(
    //     'Cancelled',
    //     'Your imaginary file is safe :)',
    //     'error'
    //   )
    // }
  })
}

/** Sweet alert positioning  */
positionAlert() {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500,
    footer: '<a href>Why do I have this issue?</a>'
    // html:
    // 'You can use <b>bold text</b>, ' +
    // '<a href="//sweetalert2.github.io">links</a> ' +
    // 'and other HTML tags',
  })
}

/** Auto close Sweet alert */
autocloseAlert(title?, html? , timer?, timerProgressBar?) {
  const titleData = title !== undefined ? title : 'No title';
  let timerInterval
Swal.fire({
  title: titleData,
  html: 'I will close in <b></b> milliseconds.',
  timer: 2000,
  timerProgressBar: true,
  onBeforeOpen: () => {
    Swal.showLoading()
    timerInterval = setInterval(() => {
      const content = Swal.getContent()
      if (content) {
        const b = content.querySelector('b')
        if (b) {
          // b.textContent = Swal.getTimerLeft()
        }
      }
    }, 100)
  },
  onClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
  }
})
}


imageAlert() {
  Swal.fire({
    title: 'Sweet!',
    text: 'Modal with a custom image.',
    imageUrl: 'https://unsplash.it/400/200',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
  })
}

}