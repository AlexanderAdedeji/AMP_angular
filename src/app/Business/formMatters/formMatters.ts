import { Injectable } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Injectable()

export class FormMatters {

    public login: FormGroup;
    public UserReg: FormGroup;
    public AgentReg:FormGroup;
    public confirmNumber: FormGroup;
    public forgotPassword: FormGroup;
    public createDevice: FormGroup;
    public assignEmployeeToDevice: FormGroup;
    public unAssigneEmployeeFromDevice: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
    ) {
    }
/*** Staff Login Validation */

    LoginMethod() {
        this.login =
            this.formBuilder.group({
                //   accountNo: new FormControl('', Validators.compose([Validators.minLength(10), 
                //     Validators.required, Validators.maxLength(10),
                //     Validators.pattern("^[0-9]*$")])),

                email: new FormControl('', Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                  ])),
                  password: new FormControl('', Validators.compose([
                    Validators.minLength(5),
                    Validators.required
                  ])),
            });
        return this.login;
    }

    /*** Forgot Password Validation */

    ForgotPasswordMethod() {
        this.forgotPassword =
            this.formBuilder.group({
                email: new FormControl('', Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                  ]))
            });
        return this.forgotPassword;
    }
    CreateDeviceMethod() {
        this.createDevice =
            this.formBuilder.group({
                mac_id: new FormControl('', Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                  ])),
                  name: new FormControl('', Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                  ])),
                  agent_id: new FormControl('', Validators.compose([Validators.required ])),

            });
        return this.createDevice;
    }



    assignEmployeeToDeviceMethod() {
        this.assignEmployeeToDevice =
            this.formBuilder.group({
                // mac_id: new FormControl('', Validators.compose([
                //     Validators.required,
                //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                //   ])),
                  employee_id: new FormControl('', Validators.compose([Validators.required ])),

            });
        return this.assignEmployeeToDevice;
    }

    unAssigneEmployeeFromDeviceeMethod() {
        this.unAssigneEmployeeFromDevice =
            this.formBuilder.group({
                // mac_id: new FormControl('', Validators.compose([
                //     Validators.required,
                //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                //   ])),
                  employee_id: new FormControl('', Validators.compose([Validators.required ])),

            });
        return this.unAssigneEmployeeFromDevice;
    }

    /** clients Mobile nUmber Confirmatin Methods */
    ConfirmMobileNumberMethod() {
        this.confirmNumber =
            this.formBuilder.group({
                mobileNumber: new FormControl('', Validators.compose([
                    Validators.required,
                    Validators.minLength(11),
                    Validators.maxLength(16),
                  ])),
                  TermsIsChecked: new FormControl(undefined, [Validators.requiredTrue])
            });
        return this.confirmNumber;
    }


    userRegistrationMethod() {
        this.UserReg = this.formBuilder.group({
          // email: new FormControl('', Validators.compose([
          //     Validators.required,
          //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
          //   ])),
          email: new FormControl(
            "",
            Validators.compose([
              Validators.required,
              Validators.pattern(
                "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
              ),
            ])
          ),
          password: new FormControl(
            "",
            Validators.compose([Validators.minLength(5), Validators.required])
          ),
          first_name: new FormControl(
            "",
            Validators.compose([Validators.required])
          ),
          last_name: new FormControl(
            "",
            Validators.compose([Validators.required])
          ),
          Address: new FormControl(
            "",
            Validators.compose([Validators.required])
          ),
          Phone: new FormControl(
            "",
            Validators.compose([Validators.required, Validators.minLength(11)])
          ),
          lasrra_id: new FormControl(
            "",
            Validators.compose([
              Validators.required,
              Validators.pattern(/^[\w\s]+$/),
            ])
          ),
          agent_id: new FormControl(
            "",
            Validators.compose([Validators.required])
          ),
          user_type_id: new FormControl(
            "",
            Validators.compose([Validators.required])
          ),
        });
        return this.UserReg;
    }

    AgentRegistrationMethod() {
        this.AgentReg =
            this.formBuilder.group({
                email: new FormControl('', Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                  ])),
                   name: new FormControl('', Validators.compose([ Validators.required])),
                    address: new FormControl('', Validators.compose([ Validators.required])),
                  
                  //   TermsIsChecked: new FormControl(undefined, [Validators.requiredTrue])
                });
        return this.AgentReg;
    }
}
